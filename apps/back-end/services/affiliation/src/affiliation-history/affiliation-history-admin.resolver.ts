import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AffiliationPurchase } from '@affiliation-history/entities';
import { GetSellerAffiliationHistoryQuery } from './queries';
import { UseGuards } from '@nestjs/common';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class AffiliationHistoryAdminResolver {
  constructor(private querybus: QueryBus) {}

  @Query(() => [AffiliationPurchase])
  getUserAffiliationHistory(@Args('id') id: string) {
    return this.querybus.execute(new GetSellerAffiliationHistoryQuery(id));
  }
}
