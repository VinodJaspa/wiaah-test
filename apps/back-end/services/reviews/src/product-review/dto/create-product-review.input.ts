import { InputType, Int, Field, ID, Float } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CreateProductReviewInput {
  @Field(() => ID)
  productId: string;

  @Field(() => Float)
  @Min(1)
  @Max(5)
  rate: number;

  @Field(() => String)
  message: string;
}
