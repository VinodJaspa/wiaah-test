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
import { Logger, UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UploadService } from '@wiaah/upload';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductsService } from '@products/products.service';
import { Discount, Product, Cashback } from '@products/entities';
import { CreateProductInput, GetFilteredProductsInput } from '@products/dto';
import { UpdateProductInput } from '@products/dto';
import { GetProductVendorLinkQuery } from '@products/queries';

import { DeleteProductCommand } from '@products/command';
import { PrismaService } from 'prismaService';
import { Prisma } from '@prisma-client';
import { Account } from './entities/extends';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadService: UploadService,
    private readonly querybus: QueryBus,
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  logger = new Logger('ProductResolver');

  @Mutation(() => String)
  getProductVendorLink(
    @Args('productId') productId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<GetProductVendorLinkQuery, string>(
      new GetProductVendorLinkQuery(productId, user),
    );
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string): Promise<Product> {
    const product = await this.productsService.getProductById(id);
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
