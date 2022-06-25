import { InputType, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class ReviewDataInput {
  @Field((type) => Float)
  rate: number;

  @Field((type) => String)
  message: string;
}

@InputType()
export class CreateReviewInput {
  @Field((type) => ID)
  itemId: string;

  @Field((type) => ReviewDataInput)
  reviewData: ReviewDataInput;
}
