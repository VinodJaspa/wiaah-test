import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AffiliationPurchase } from '@affiliation-history/entities';
import {
  GetFilteredAffiliationsQuery,
  GetSellerAffiliationHistoryQuery,
} from './queries';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { GetFilteredAffiliationHistoryInput } from '@affiliation-history/dto';
import { GetUserAffiliationsPurchasesInput } from '@affiliation/dto';
import { PrismaService } from 'prismaService';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class AffiliationHistoryAdminResolver {
  constructor(
    private querybus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [AffiliationPurchase])
  getUserAffiliationHistory(@Args('id') id: string) {
    return this.querybus.execute(new GetSellerAffiliationHistoryQuery(id));
  }

  @Query(() => [AffiliationPurchase])
  getUserAffiliationsPurchases(
    @Args('args') args: GetUserAffiliationsPurchasesInput,
  ) {
    const { skip, take } = ExtractPagination(args.pagination);

    return this.prisma.affiliationPurchase.findMany({
      where: {
        affiliatorId: args.id,
      },
      skip,
      take,
    });
  }

  @Query(() => [AffiliationPurchase])
  getFilteredAffiliationsHistory(
    @Args('filters') filters: GetFilteredAffiliationHistoryInput,
  ) {
    return this.querybus.execute(new GetFilteredAffiliationsQuery(filters));
  }
}
