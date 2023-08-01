import { Field, Int, ID, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SellerSalesStat {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => Int)
  sales: number;

  @Field(() => Float)
  salesAmount: number;

  @Field(() => Int)
  purchases: number;

  @Field(() => Float)
  purchasesAmount: number;

  @Field(() => Int)
  returns: number;

  @Field(() => Float)
  returnsAmount: number;

  @Field(() => Int)
  affiliations: number;

  @Field(() => Float)
  affiliationsAmount: number;

  @Field(() => [SalesCategory])
  salesCategories: SalesCategory[];
}

@ObjectType()
export class SalesCategory {
  @Field(() => ID)
  categoryId: string;

  @Field(() => Int)
  sales: number;
}
