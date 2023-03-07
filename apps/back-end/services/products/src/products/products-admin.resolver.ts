import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { Product } from '@products/entities';
import { PrismaService } from 'prismaService';
import { Prisma } from '@prisma-client';
import { QueryBus } from '@nestjs/cqrs';

import {
  AdminGetAccountProductsInput,
  GetFilteredProductsAdminInput,
  UpdateProductInput,
} from './dto';
import { GetSellersIdsByNameQuery } from './queries';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class ProductsAdminResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly querybus: QueryBus,
  ) {}

  @Query(() => [Product])
  async getAdminFilteredProducts(
    @Args('args') args: GetFilteredProductsAdminInput,
  ) {
    const filters: Prisma.ProductWhereInput[] = [];

    if (args.title) {
      filters.push({
        title: {
          some: {
            value: {
              contains: args.title,
            },
          },
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

    if (args.type) {
      filters.push({
        type: args.type,
      });
    }

    if (args.usageStatus) {
      filters.push({
        usageStatus: args.usageStatus,
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
      data: {
        ...rest,
        discount: {
          update: rest.discount,
        },
      },
    });
    return true;
  }

  @Query(() => [Product])
  async adminGetAccountProducts(
    @Args('args') args: AdminGetAccountProductsInput,
  ) {
    const { skip, take } = ExtractPagination(args.pagination);

    const filters: Prisma.ProductWhereInput[] = [];

    if (args.title) {
      filters.push({
        title: {
          some: {
            value: {
              contains: args.title,
            },
          },
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

    if (args.type) {
      filters.push({
        type: args.type,
      });
    }

    if (args.usageStatus) {
      filters.push({
        usageStatus: args.usageStatus,
      });
    }

    return this.prisma.product.findMany({
      where: {
        AND: [
          {
            sellerId: args.accountId,
          },
          ...filters,
        ],
      },
      skip,
      take,
    });
  }

  @Query(() => Product, { nullable: true })
  async adminGetProduct(@Args('id') id: string) {
    const res = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    return res;
  }

  @Mutation(() => Boolean)
  async adminDeleteProduct(
    @Args('id') id: string,
    @Args('reason') reason: string,
  ) {
    await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        status: 'suspended',
        suspensionReason: reason,
      },
    });
    return true;
  }
}
