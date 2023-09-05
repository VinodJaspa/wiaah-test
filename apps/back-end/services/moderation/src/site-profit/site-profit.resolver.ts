import { Args, Query, Resolver } from '@nestjs/graphql';
import { SiteProfit, SiteSale } from './entities/site-profit.entity';
import { PrismaService } from 'prismaService';
import {
  GetSiteProfitInput,
  StatsRetrivePeriod,
} from './dto/get-site-profit.input';
import {
  GqlAuthorizationGuard,
  SubtractFromDate,
  accountType,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';

Resolver(() => SiteProfit);
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class SiteProfitResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [SiteSale])
  async getSiteSales(
    @Args('args') args: GetSiteProfitInput,
  ): Promise<SiteSale[]> {
    const searchPeriod = this.getSearchPeriod(args.period);

    const res = await this.prisma.salesStats.findMany({
      where: {
        createdAt: {
          gte: searchPeriod,
        },
        type: args.type,
      },
    });

    return res;
  }

  @Query(() => SiteProfit)
  async getSiteProfit(
    @Args('args') args: GetSiteProfitInput,
  ): Promise<SiteProfit> {
    const searchPeriod = this.getSearchPeriod(args.period);

    const lastPeriod = SubtractFromDate(new Date(searchPeriod), {
      days:
        args.period === StatsRetrivePeriod.year
          ? 365
          : StatsRetrivePeriod.month
          ? 30
          : args.period === StatsRetrivePeriod.week
          ? 7
          : 1,
    });

    const currentStats = await this.prisma.salesStats.findMany({
      where: {
        createdAt: {
          gte: searchPeriod,
        },
        type: args.type,
      },
    });

    const lastPeriodStats = await this.prisma.salesStats.findMany({
      where: {
        createdAt: {
          gte: lastPeriod,
        },
        type: args.type,
      },
    });

    const totalCurrentStats = currentStats.reduce(
      (acc, curr) => {
        return {
          affiliations: acc.affiliations + curr.affiliations,
          affiliationsAmount: acc.affiliationsAmount + curr.affiliationsAmount,
          refunds: acc.refunds + curr.refunds,
          refundsAmount: acc.refundsAmount + curr.refundsAmount,
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
        refunds: 0,
        refundsAmount: 0,
        sales: 0,
        salesAmount: 0,
      } as SiteProfit,
    );

    const totalPreviousStats = lastPeriodStats.reduce(
      (acc, curr) => {
        return {
          affiliations: acc.affiliations + curr.affiliations,
          affiliationsAmount: acc.affiliationsAmount + curr.affiliationsAmount,
          refunds: acc.refunds + curr.refunds,
          refundsAmount: acc.refundsAmount + curr.refundsAmount,
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
        refunds: 0,
        refundsAmount: 0,
        sales: 0,
        salesAmount: 0,
      } as SiteProfit,
    );

    return {
      affiliations: totalCurrentStats.affiliations,
      affiliationsAmount: totalCurrentStats.affiliationsAmount,
      purchases: totalCurrentStats.purchases,
      purchasesAmount: totalCurrentStats.purchasesAmount,
      refunds: totalCurrentStats.refunds,
      refundsAmount: totalCurrentStats.refundsAmount,
      sales: totalCurrentStats.sales,
      salesAmount: totalCurrentStats.salesAmount,
      lastPurchasesAmount: totalPreviousStats.purchasesAmount,
      lastRefundsAmount: totalPreviousStats.refundsAmount,
      lastSalesAmount: totalPreviousStats.salesAmount,
      lastAffiliationsAmount: totalPreviousStats.affiliationsAmount,
    };
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
