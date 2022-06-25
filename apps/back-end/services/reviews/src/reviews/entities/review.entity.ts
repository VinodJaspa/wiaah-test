import { Field, Int, ObjectType, Float, ID } from '@nestjs/graphql';

@ObjectType()
export class ReviewData {
  @Field((type) => Float)
  rate: number;

  @Field((type) => String)
  message: string;
}

@ObjectType()
export class Review {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  reviewedItemId: string;

  @Field((type) => ID)
  reviewerId: string;

  @Field((type) => ReviewData)
  reviewData: ReviewData;
}
