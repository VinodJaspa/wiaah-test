import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field((type) => ID)
  from: string;

  @Field((type) => ID)
  to: string;

  @Field((type) => Int)
  amount: number;

  @Field(() => String, { nullable: true })
  descirption?: string;
}
