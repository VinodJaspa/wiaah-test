import { Directive, Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields:"id")')
export class ProductRating {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  reviews: number;

  @Field(() => Float)
  givenStars: number;
}
