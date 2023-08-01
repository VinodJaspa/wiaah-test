import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class SiteProfit {
  @Field(() => Int)
  sales: number;

  @Field(() => Float)
  salesAmount: number;

  @Field(() => Int)
  purchases: number;

  @Field(() => Float)
  purchasesAmount: number;

  @Field(() => Int)
  refunds: number;

  @Field(() => Float)
  refundsAmount: number;

  @Field(() => Int)
  affiliations: number;

  @Field(() => Float)
  affiliationsAmount: number;

  @Field(() => Float)
  lastSalesAmount: number;

  @Field(() => Float)
  lastPurchasesAmount: number;

  @Field(() => Float)
  lastRefundsAmount: number;

  @Field(() => Float)
  lastAffiliationsAmount: number;
}

@ObjectType()
export class SiteSale {
  @Field(() => String)
  createdAt: Date;

  @Field(() => Float)
  salesAmount: number;
}
