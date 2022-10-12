import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ReviewProductInput {
  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  rate: number;
}
