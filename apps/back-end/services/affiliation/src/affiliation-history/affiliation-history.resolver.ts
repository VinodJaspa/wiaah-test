import { Resolver, Query } from '@nestjs/graphql';
import { AffiliationPurchase } from './entities/affiliation-history.entity';
import { QueryBus } from '@nestjs/cqrs';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { GetSellerAffiliationHistoryQuery } from './queries';

@Resolver(() => AffiliationPurchase)
export class AffiliationHistoryResolver {
  constructor(private readonly querybus: QueryBus) {}

  @Query(() => AffiliationPurchase)
  getMyProductsAffiliationHistory(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute<
      GetSellerAffiliationHistoryQuery,
      AffiliationPurchase[]
    >(new GetSellerAffiliationHistoryQuery(user.id));
  }
}
