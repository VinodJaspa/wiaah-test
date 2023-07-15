import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Prisma } from '@prisma-client';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
  SubtractFromDate,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { GetSalesDurningPeriodInput, OrderSearchPeriod } from './dto';
import { AdminGetSellerSalesInput } from './dto/admin-get-seller-sales';
import { Order, OrderItem } from './entities';
import { Account, Product } from './entities/extends';

@Resolver(() => OrderItem)
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class OrderItemResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [OrderItem])
  async adminGetSellerSales(@Args('args') args: AdminGetSellerSalesInput) {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.orderItem.findMany({
      where: {
        Order: {
          sellerId: args.accountId,
        },
      },
      take,
      skip,
    });
  }

  @Query(() => [OrderItem])
  async getSalesDurningPeriod(
    @Args('args')
    args: GetSalesDurningPeriodInput,
  ) {
    const { take, skip } = ExtractPagination(args.pagination);

    const filters: Prisma.OrderItemWhereInput[] = [];

    if (args.searchPeriod) {
      switch (args.searchPeriod) {
        case OrderSearchPeriod.day:
          filters.push({
            createdAt: {
              gte: SubtractFromDate(new Date(), { days: 1 }),
            },
          });
          break;

        case OrderSearchPeriod.week:
          filters.push({
            createdAt: {
              gte: SubtractFromDate(new Date(), { days: 7 }),
            },
          });
          break;

        default:
          filters.push({
            createdAt: {
              gte: SubtractFromDate(new Date(), { days: 30 }),
            },
          });
          break;
      }
    }

    const res = await this.prisma.orderItem.findMany({
      orderBy: {
        paidAt: 'desc',
      },
      take,
      skip,
    });

    return res;
  }

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

  @ResolveField(() => Account)
  affiliator(@Parent() item: OrderItem) {
    return {
      __typename: 'Account',
      id: item.affiliatorId,
    };
  }
}
