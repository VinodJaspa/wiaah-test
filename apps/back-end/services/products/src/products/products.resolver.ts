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
import { Inject, Logger, UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  KafkaMessageHandler,
  SERVICES,
  UserPreferedLang,
} from 'nest-utils';
import { UploadService } from '@wiaah/upload';
import { CommandBus } from '@nestjs/cqrs';
import { ProductsService } from '@products/products.service';
import {
  Discount,
  Product,
  Cashback,
  ProductsCursorPaginationResponse,
} from '@products/entities';
import {
  CreateProductInput,
  GetFilteredProductsInput,
  GetSellerProductsInput,
} from '@products/dto';
import { UpdateProductInput } from '@products/dto';
import { DeleteProductCommand } from '@products/command';
import { PrismaService } from 'prismaService';
import { Prisma } from '@prisma-client';
import { Account } from './entities/extends';
import {
  BuyerToProductActionsType,
  CanPreformProductActionMessage,
  CanPreformProductActionMessageReply,
} from 'nest-dto';
import { ClientKafka } from '@nestjs/microservices';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadService: UploadService,
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  logger = new Logger('ProductResolver');

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

  @Query(() => Product)
  getProduct(@Args('id', { type: () => ID }) id: string) {
    return this.productsService.getProductById(id);
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  createNewProduct(
    @Args('createNewProductInput') createProductInput: CreateProductInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.productsService.createNewProduct(createProductInput, user);
  }

  @Mutation(() => Product)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
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
}
