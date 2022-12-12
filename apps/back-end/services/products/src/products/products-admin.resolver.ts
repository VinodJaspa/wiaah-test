import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { Product } from '@products/entities';
import { PrismaService } from 'prismaService';
import { Prisma } from '@prisma-client';
import { QueryBus } from '@nestjs/cqrs';

import { GetFilteredProductsAdminInput, UpdateProductInput } from './dto';
import { GetSellersIdsByNameQuery } from './queries';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class ProductsAdminResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly querybus: QueryBus,
  ) {}

  @Query(() => [Product])
  async getAllProducts(@Args('args') args: GetFilteredProductsAdminInput) {
    const filters: Prisma.ProductWhereInput[] = [];

    if (args.title) {
      filters.push({
        title: {
          contains: args.title,
        },
      });
    }

    if (args.price) {
      filters.push({
        price: args.price,
      });
    }

    if (args.qty) {
      filters.push({
        stock: args.qty,
      });
    }
    if (args.status) {
      filters.push({
        status: args.status,
      });
    }
    if (args.productId) {
      filters.push({
        id: {
          contains: args.productId,
        },
      });
    }
    if (args.updatedAt) {
      filters.push({
        updatedAt: {
          gte: args.updatedAt,
        },
      });
    }
    if (args.seller) {
      const ids = await this.querybus.execute(
        new GetSellersIdsByNameQuery(args.seller, args.pagination),
      );
      filters.push({
        sellerId: {
          in: [ids],
        },
      });
    }

    return this.prisma.product.findMany({
      where: {
        AND: filters,
      },
    });
  }

  @Mutation(() => Boolean)
  async updateProductAdmin(@Args('args') args: UpdateProductInput) {
    const { id, ...rest } = args;
    await this.prisma.product.update({
      where: {
        id,
      },
      data: rest,
    });
    return true;
  }
}
