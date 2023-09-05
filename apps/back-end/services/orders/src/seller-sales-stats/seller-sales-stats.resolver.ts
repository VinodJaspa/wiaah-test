import { Args, Query, Resolver, registerEnumType } from '@nestjs/graphql';
import { SellerSalesStat } from './entities/seller-sales-stat.entity';
import { PrismaService } from 'prismaService';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  NoReadPremissionPublicError,
  SubtractFromDate,
  accountType,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { RefundStatusType, SellerSalesType } from '@prisma-client';

export enum StatsRetrivePeriod {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

registerEnumType(StatsRetrivePeriod, { name: 'StatsRetrivePeriod' });
registerEnumType(SellerSalesType, { name: 'SellerSalesType' });

@Resolver(() => SellerSalesStat)
export class SellerSalesStatsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [SellerSalesStat])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getSellerStats(
    @Args('sellerId') id: string,
    @Args('period', { type: () => StatsRetrivePeriod })
    period: StatsRetrivePeriod,
    @Args('type', { type: () => SellerSalesType }) type: SellerSalesType,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<[SellerSalesStat, SellerSalesStat]> {
    await this.validateReadPremission(id, user);
    const searchPeriod = this.getSearchPeriod(period);

    const lastPeriod = SubtractFromDate(new Date(searchPeriod), {
      days:
        period === StatsRetrivePeriod.year
          ? 365
          : StatsRetrivePeriod.month
          ? 30
          : period === StatsRetrivePeriod.week
          ? 7
          : 1,
    });

    const currentStats = await this.prisma.sellerSalesStatistics.findMany({
      where: {
        createdAt: {
          gte: searchPeriod,
        },
        type,
      },
    });

    const lastPeriodStats = await this.prisma.sellerSalesStatistics.findMany({
      where: {
        createdAt: {
          gte: lastPeriod,
          lte: searchPeriod,
        },
        type,
      },
    });

    const totalCurrentStats = currentStats.reduce(
      (acc, curr) => {
        return {
          ...curr,
          affiliations: acc.affiliations + curr.affiliations,
          affiliationsAmount: acc.affiliationsAmount + curr.affiliationsAmount,
          returns: acc.returns + curr.returns,
          returnsAmount: acc.returnsAmount + curr.returnsAmount,
          sales: acc.sales + curr.sales,
          salesAmount: acc.salesAmount + curr.salesAmount,
          purchases: acc.purchases + curr.purchases,
          purchasesAmount: acc.purchasesAmount + curr.purchasesAmount,
        };
      },
      {
        affiliations: 0,
        affiliationsAmount: 0,
        purchases: 0,
        purchasesAmount: 0,
        returns: 0,
        returnsAmount: 0,
        sales: 0,
        salesAmount: 0,
      } as SellerSalesStat,
    );

    const totalPreviousStats = lastPeriodStats.reduce(
      (acc, curr) => {
        return {
          ...curr,
          affiliations: acc.affiliations + curr.affiliations,
          affiliationsAmount: acc.affiliationsAmount + curr.affiliationsAmount,
          returns: acc.returns + curr.returns,
          returnsAmount: acc.returnsAmount + curr.returnsAmount,
          sales: acc.sales + curr.sales,
          salesAmount: acc.salesAmount + curr.salesAmount,
          purchases: acc.purchases + curr.purchases,
          purchasesAmount: acc.purchasesAmount + curr.purchasesAmount,
        };
      },
      {
        affiliations: 0,
        affiliationsAmount: 0,
        purchases: 0,
        purchasesAmount: 0,
        returns: 0,
        returnsAmount: 0,
        sales: 0,
        salesAmount: 0,
      } as SellerSalesStat,
    );

    return [totalCurrentStats, totalPreviousStats];
  }

  @Query(() => [SellerSalesStat])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getSellerDailySalesStats(
    @Args('sellerId') id: string,
    @Args('period') period: StatsRetrivePeriod,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<SellerSalesStat[]> {
    await this.validateReadPremission(id, user);
    const searchPeriod = this.getSearchPeriod(period);
    const sellerStats = await this.prisma.sellerSalesStatistics.findMany({
      where: {
        sellerId: id,
        createdAt: {
          gte: searchPeriod,
        },
      },
    });

    return sellerStats;
  }

  async validateReadPremission(
    sellerId: string,
    user: AuthorizationDecodedUser,
  ) {
    if (sellerId !== user.id) throw new NoReadPremissionPublicError();
  }

  getSearchPeriod(period: StatsRetrivePeriod) {
    const currentDate = new Date();

    const searchPeriod =
      period === StatsRetrivePeriod.day
        ? new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
          )
        : period === StatsRetrivePeriod.week
        ? new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay(),
          )
        : period === StatsRetrivePeriod.month
        ? new Date(currentDate.getFullYear(), currentDate.getMonth())
        : period === StatsRetrivePeriod.year
        ? new Date(currentDate.getFullYear())
        : new Date();

    return searchPeriod;
  }
}
