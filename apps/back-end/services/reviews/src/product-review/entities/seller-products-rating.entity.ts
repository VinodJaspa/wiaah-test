import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SellerProductsRating {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  reviews: number;

  @Field(() => Float)
  givenStars;
}
