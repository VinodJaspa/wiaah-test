import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Order, OrderItem } from './entities';
import { Account, Product } from './entities/extends';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [OrderItem])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getRecentSales(
    @Args('count', { nullable: true, defaultValue: 10, type: () => Int })
    take: number,
  ) {
    const res = await this.prisma.orderItem.findMany({
      orderBy: {
        paidAt: 'desc',
      },
      take,
    });

    return res;
  }

  @ResolveField(() => Account)
  async seller(@Parent() orderItem: OrderItem) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderItem.orderId,
      },
    });
    return {
      __typename: 'Account',
      id: order.sellerId,
    };
  }

  @ResolveField(() => Account)
  async buyer(@Parent() orderItem: OrderItem) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderItem.orderId,
      },
    });
    return {
      __typename: 'Account',
      id: order.buyerId,
    };
  }

  @ResolveField(() => Product)
  product(@Parent() orderItem: OrderItem) {
    return {
      __typename: 'Product',
      id: orderItem.id,
    };
  }

  @ResolveField(() => Order)
  order(@Parent() orderItem: OrderItem) {
    return this.prisma.order.findUnique({
      where: {
        id: orderItem.orderId,
      },
    });
  }
}
