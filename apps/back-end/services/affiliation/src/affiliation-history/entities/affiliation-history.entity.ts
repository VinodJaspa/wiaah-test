import { Product, Service } from '@affiliation/entities';
import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class AffiliationPurchase {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  itemId: string;

  @Field(() => String)
  itemType: string;

  @Field(() => Service, { nullable: true })
  service?: Service;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => ID)
  sellerId: string;

  @Field(() => ID)
  affiliatorId: string;

  @Field(() => ID)
  purchaserId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Float)
  paidCommissionPercent: number;

  @Field(() => Float)
  paidCommissionAmount: number;
}
