import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderItem } from '@orders/entities';
import { Prisma } from '@prisma-client';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AdminGetReturnedOrdersInput } from './dto';
import { AdminGetUserReturnedOrdersInput } from './dto/admin-get-user-returned-order.input';
import { ReturnedOrder } from './entities/returned-order.entity';

@Resolver(() => ReturnedOrder)
export class ReturnedOrdersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [ReturnedOrder])
  adminGetUserReturnedOrders(
    @Args('args') args: AdminGetUserReturnedOrdersInput,
  ) {
    const { take, skip } = ExtractPagination(args.pagination);

    return this.prisma.refundRequest.findMany({
      where: {
        requestedById: args.accountId,
      },
      skip,
      take,
    });
  }

  @Query(() => [ReturnedOrder])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetReturnedOrders(@Args('args') args: AdminGetReturnedOrdersInput) {
    const filters: Prisma.RefundRequestWhereInput[] = [];
    const { take, skip } = ExtractPagination(args.pagination);

    if (args.price) {
      filters.push({
        AND: [
          {
            amount: {
              gte: Math.floor(args.price),
            },
          },
          {
            amount: {
              lte: Math.floor(args.price) + 1,
            },
          },
        ],
      });
    }

    if (args.qty) {
      filters.push({
        qty: args.qty,
      });
    }

    if (args.reason) {
      filters.push({
        reason: {
          contains: args.reason,
        },
      });
    }

    return this.prisma.refundRequest.findMany({
      where: {
        AND: [
          ...filters,
          {
            status: 'accepted',
          },
        ],
      },
      take,
      skip,
    });
  }

  @ResolveField(() => OrderItem)
  orderItem(@Parent() prod: ReturnedOrder) {
    return this.prisma.orderItem.findUnique({
      where: {
        id: prod.orderItemId,
      },
    });
  }
}
