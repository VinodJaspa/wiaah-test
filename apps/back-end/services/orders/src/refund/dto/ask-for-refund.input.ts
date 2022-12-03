import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { RefundType } from '@prisma-client';

@InputType()
export class AskForRefundInput {
  @Field(() => ID)
  id: string;

  @Field(() => RefundType)
  type: RefundType;

  @Field(() => Boolean, { nullable: true })
  fullAmount: boolean;

  @Field(() => Float, { nullable: true })
  amount: number;

  @Field(() => String, { nullable: true, defaultValue: '' })
  reason: string;
}
