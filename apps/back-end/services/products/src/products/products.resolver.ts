import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
  ID,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { Inject, Ip, Logger, UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  generateCursorPaginationResponse,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlPaginationInput,
  KAFKA_MESSAGES,
  KafkaMessageHandler,
  SERVICES,
  setPrismaCursorPaginationProps,
  UserPreferedLang,
} from 'nest-utils';
import { CommandBus } from '@nestjs/cqrs';
import { ProductsService } from '@products/products.service';
import {
  Discount,
  Product,
  Cashback,
  ProductsCursorPaginationResponse,
  ProductSearchPaginationResponse,
  ProductPaginationResponse,
  ProductAttribute,
} from '@products/entities';
import {
  CreateProductInput,
  GetFilteredProductsInput,
  GetSellerProductsInput,
} from '@products/dto';
import { UpdateProductInput } from '@products/dto';
import { DeleteProductCommand } from '@products/command';
import { PrismaService } from 'prismaService';
import { Prisma, UserProductCategoryInteractions } from '@prisma-client';
import { Account } from './entities/extends';
import {
  BuyerToProductActionsType,
  CanPreformProductActionMessage,
  CanPreformProductActionMessageReply,
} from 'nest-dto';
import { ClientKafka } from '@nestjs/microservices';
import { GetTopSalesProductsByCategoryPaginationInput } from './dto/get-top-sales-products.input';
import { lookup } from 'geoip-lite';
import { ProductAttributeService } from 'src/product-attribute/product-attribute.service';
import { GetSellerTopSellingProductsInput } from './dto/get-seller-top-selling-products.input';

@Resolver(() => Product)
export class ProductsResolver {
  // product recommendation weights
  categoryPurchaseWeight = 5;
  categoryVisitWeight = 2;
  shopCountryWeight = 2;
  shopRatingWeight = 1.2;
  productRatingWeight = 1.5;
  productSaleWeight = 0.05;
  countryPurchasesWeight = 1.15;
  countryVisitsWeight = 1.1;

  constructor(
    private readonly productsService: ProductsService,
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly productAttributeService: ProductAttributeService,
  ) {}

  logger = new Logger('ProductResolver');

  @Query(() => ProductPaginationResponse)
  async getProductRecommendation(
    @Args('pagination') pagination: GqlPaginationInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Ip() userIp: string,
    @GetLang() langId: UserPreferedLang,
  ): Promise<ProductPaginationResponse> {
    const { page, skip, take, totalSearched } = ExtractPagination(pagination);
    const userCountry = lookup(userIp).country;
    const products = await this.prisma.product.findMany({
      where: { status: 'active' },
      select: {
        categoryId: true,
        sellerId: true,
        id: true,
        rate: true,
        sales: true,
      },
    });

    const shops = await this.prisma.shop.findMany({
      where: {
        ownerId: {
          in: products.reduce(
            (acc, curr) =>
              acc.includes(curr.sellerId) ? acc : [...acc, curr.sellerId],
            [] as string[],
          ),
        },
      },
      select: {
        ownerId: true,
        location: {
          select: {
            countryCode: true,
          },
        },
      },
    });

    let userCategoryStats: UserProductCategoryInteractions | undefined;
    if (user) {
      userCategoryStats =
        await this.prisma.userProductCategoryInteractions.findUnique({
          where: {
            userId: user.id,
          },
        });
    }

    const productScores = products.reduce((acc, curr) => {
      let score = 0;

      if (userCategoryStats) {
        const cateStats = userCategoryStats.stats.find(
          (cate) => cate.categoryId === curr.categoryId,
        );
        if (cateStats) {
          const purchasesWeightScore =
            cateStats.purchases * this.categoryPurchaseWeight;

          const visitWeightScore = cateStats.visits * this.categoryVisitWeight;

          score += purchasesWeightScore;
          score += visitWeightScore;
        }
      }

      const productShop = shops.find((shop) => shop.ownerId === curr.sellerId);
      if (productShop && productShop.location.countryCode === userCountry) {
        score += this.shopCountryWeight;
      }

      const ratingScore = curr.rate * this.productRatingWeight;
      const salesScore = curr.sales * this.productSaleWeight;

      score += ratingScore;
      score += salesScore;

      return [...acc, { productId: curr.id, score }];
    }, [] as { productId: string; score: number }[]);

    const sortedProds = productScores.sort(
      (first, second) => first.score - second.score,
    );

    const prods = await this.prisma.product.findMany({
      where: {
        id: {
          in: sortedProds
            .slice(totalSearched, totalSearched + take)
            .map((v) => v.productId),
        },
      },
    });

    return {
      data: sortedProds
        .map(({ productId }) => prods.find((prod) => prod.id === productId))
        .filter((prod) => !!prod)
        .map((prod) => this.productsService.formatProduct(prod, langId)),
      total: 0,
      hasMore: totalSearched < productScores.length,
    };
  }

  @Query(() => Product)
  async getProductById(
    @Args('id') id: string,
    @Args('isClick') isClick: boolean,
  ): Promise<Product> {
    const product = await this.productsService.getProductById(id);

    if (isClick) {
      const {
        results: { data, error, success },
      } = await KafkaMessageHandler<
        string,
        CanPreformProductActionMessage,
        CanPreformProductActionMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.CAN_PREFORM_ACTION_MESSAGES.canPreformProductAction(
          BuyerToProductActionsType.vendor_external_click,
        ),
        new CanPreformProductActionMessage({
          action: BuyerToProductActionsType.vendor_external_click,
          product: {
            id,
          },
          seller: {
            id: product.sellerId,
          },
        }),
      );

      if (data === true) {
        const clicks = await this.prisma.productDayExternalClicks.findFirst({
          where: {
            AND: [
              {
                productId: id,
              },
              {
                createdAt: {
                  gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    0,
                    0,
                    0,
                  ),
                },
              },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (clicks) {
          await this.prisma.productDayExternalClicks.update({
            where: {
              id: clicks.id,
            },
            data: {
              clicks: {
                increment: 1,
              },
            },
          });
        } else {
          const clicks = await this.prisma.productDayExternalClicks.create({
            data: {
              productId: id,
              clicks: 1,
            },
          });

          await this.prisma.product.update({
            where: {
              id,
            },
            data: {
              todayProductClickId: clicks.id,
            },
          });
        }
      }
    }

    return { ...product };
  }

  @Query(() => [Product])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  getMyProducts(@Args('filterInput') args: GetFilteredProductsInput) {
    const { skip, take } = ExtractPagination(args.pagination);
    const filters: Prisma.ProductWhereInput[] = [];

    if (args.type) {
      filters.push({
        type: args.type,
      });
    }

    if (args.minPrice) {
      filters.push({
        price: {
          gte: args.minPrice,
        },
      });
    }

    if (args.maxPrice) {
      filters.push({
        price: {
          lte: args.minPrice,
        },
      });
    }

    if (args.brands) {
      filters.push({
        brand: {
          in: args.brands,
        },
      });
    }

    if (typeof args.inStock !== undefined) {
      if (args.inStock) {
        filters.push({
          stock: {
            gte: 0,
          },
        });
      } else if (args.inStock === false) {
        filters.push({
          stock: 0,
        });
      }
    }

    return this.prisma.product.findMany({
      where: {
        AND: filters,
      },
      skip,
      take,
    });
  }

  @Query(() => ProductSearchPaginationResponse)
  async getTopSalesProducts(
    @Args('args')
    args: GetTopSalesProductsByCategoryPaginationInput,
    @GetLang() langId: string,
  ): Promise<ProductSearchPaginationResponse> {
    const { skip, take } = ExtractPagination(args.pagination);

    const where: Prisma.ProductWhereInput = {
      status: 'active',
      categoryId: args.categoryId,
    };

    const res = await this.prisma.product.findMany({
      where,
      orderBy: {
        sales: 'desc',
      },
      take: take + 1,
      skip,
    });

    const total = await this.prisma.product.count({
      where,
    });

    const hasMore = res.length > take;

    return {
      data: (hasMore ? res.slice(0, take) : res).map((prod) =>
        this.productsService.formatProduct(prod, langId),
      ),
      hasMore,
      total,
    };
  }

  @Query(() => ProductsCursorPaginationResponse)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN, accountType.SELLER]))
  async getSellerTopSellingProducts(
    @Args('args') args: GetSellerTopSellingProductsInput,
    @GetLang() lang: UserPreferedLang,
  ): Promise<ProductsCursorPaginationResponse> {
    const res = await this.prisma.product.findMany({
      where: {
        sellerId: args.sellerId,
      },
      ...setPrismaCursorPaginationProps(args.pagination),
    });

    return generateCursorPaginationResponse(
      args.pagination,
      res.map((prod) => this.productsService.formatProduct(prod, lang)),
    );
  }

  @Query(() => Product)
  getProduct(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.getProductById(id);
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  createNewProduct(
    @Args('createNewProductInput') createProductInput: CreateProductInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.productsService.createNewProduct(createProductInput, user);
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  updateProduct(
    @Args('updateProductArgs') input: UpdateProductInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Product> {
    return this.productsService.updateProduct(user.id, input);
  }

  @Query(() => ProductsCursorPaginationResponse)
  async getSellerProducts(
    @Args('args') args: GetSellerProductsInput,
    @GetLang() lang: UserPreferedLang,
  ): Promise<ProductsCursorPaginationResponse> {
    const res = await this.prisma.product.findMany({
      where: {
        status: 'active',
        sellerId: args.sellerId,
      },
      take: args.take + 1,
      cursor: args.idCursor
        ? {
            id: args.idCursor,
          }
        : undefined,
    });

    return {
      cursor: args.idCursor,
      data: (res.length > args.take ? res.slice(0, res.length - 2) : res).map(
        (v) => this.productsService.formatProduct(v, lang),
      ),
      hasMore: res.length > args.take,
      nextCursor: res.at(res.length - 1).id,
    };
  }

  @ResolveReference()
  resolveReference(ref: { __typename: string; id: string }) {
    return this.productsService.getProductById(ref.id);
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  deleteProduct(
    @Args('productId', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<DeleteProductCommand, Product>(
      new DeleteProductCommand(id, user.id),
    );
  }

  @ResolveField(() => Discount)
  discount(@Parent() prod: Product) {
    return this.prisma.discount.findUnique({
      where: {
        id: prod.discountId,
      },
    });
  }

  @ResolveField(() => Cashback)
  cashback(@Parent() prod: Product) {
    return this.prisma.cashBack.findUnique({
      where: {
        id: prod.cashbackId,
      },
    });
  }

  @ResolveField(() => Account)
  seller(@Parent() prod: Product) {
    return {
      __typename: 'Account',
      id: prod.sellerId,
    };
  }

  @ResolveField(() => Boolean)
  async saved(
    @Parent() prod: Product,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const save = await this.prisma.savedProduct.findUnique({
      where: {
        productId_userId: {
          productId: prod.id,
          userId: user.id,
        },
      },
    });

    return !!save;
  }

  @ResolveField(() => Boolean)
  async isExternalProduct() {
    // TODO: get if user has pay per click membership
    return true;
  }

  @ResolveField(() => Int)
  async external_clicks(@Parent() prod: Product) {
    if (!prod.todayProductClickId) return 0;
    const clicks = await this.prisma.productDayExternalClicks.findUnique({
      where: {
        id: prod.todayProductClickId,
      },
    });

    if (!clicks) return 0;
  }

  @ResolveField(() => [ProductAttribute])
  async attributes(
    @Parent() prod: Product,
    @GetLang() langId: UserPreferedLang,
  ): Promise<ProductAttribute[]> {
    const attributes = await this.prisma.productAttribute.findMany({
      where: {
        id: {
          in: prod.selectableAttributes.map((att) => att.id),
        },
      },
    });

    return attributes
      .map((att) => {
        const attribute = prod.selectableAttributes.find(
          (v) => v.id === att.id,
        );
        return {
          ...att,
          values: att.values.filter((value) =>
            attribute.values.includes(value.id),
          ),
        };
      })
      .map((attribute) =>
        this.productAttributeService.formatProductAttribute(attribute, langId),
      );
  }
}
