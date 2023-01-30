import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AffiliationPurchase } from './entities/affiliation-history.entity';
import { QueryBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { GetSellerAffiliationHistoryQuery } from './queries';
import { UseGuards } from '@nestjs/common';
import { GetAffiliationHistoryInput } from './dto/get-affiliatiom-history.input';
import { Account, Product, Service } from '@affiliation/entities';

@Resolver(() => AffiliationPurchase)
@UseGuards(new GqlAuthorizationGuard([]))
export class AffiliationHistoryResolver {
  constructor(private readonly querybus: QueryBus) {}

  @Query(() => [AffiliationPurchase])
  getMyProductsAffiliationHistory(
    @Args('args') args: GetAffiliationHistoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<
      GetSellerAffiliationHistoryQuery,
      AffiliationPurchase[]
    >(new GetSellerAffiliationHistoryQuery(user.id));
  }

  @ResolveField(() => Product, { nullable: true })
  product(@Parent() aff: AffiliationPurchase) {
    return {
      __typename: 'Product',
      id: aff.itemId,
    };
  }

  @ResolveField(() => Service, { nullable: true })
  service(@Parent() aff: AffiliationPurchase) {
    return {
      __typename: 'Service',
      id: aff.itemId,
      type: aff.itemType,
    };
  }

  @ResolveField(() => Account)
  seller(@Parent() aff: AffiliationPurchase) {
    return {
      __typename: 'Account',
      id: aff.sellerId,
    };
  }

  @ResolveField(() => Account)
  purchaser(@Parent() aff: AffiliationPurchase) {
    return {
      __typename: 'Account',
      id: aff.purchaserId,
    };
  }

  @ResolveField(() => Account)
  affiliator(@Parent() aff: AffiliationPurchase) {
    return {
      __typename: 'Account',
      id: aff.affiliatorId,
    };
  }
}
