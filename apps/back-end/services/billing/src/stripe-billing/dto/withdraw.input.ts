import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class WithdrawInput {
  @Field(() => String)
  methodId: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  currency: string;
}
