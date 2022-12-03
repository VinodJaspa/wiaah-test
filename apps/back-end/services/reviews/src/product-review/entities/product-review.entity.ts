import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ProductReview {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  reviewerId: string;

  @Field(() => Float)
  rate: number;

  @Field(() => String)
  message: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
