import {
  Field,
  Float,
  ID,
  InputType,
  Int,
  registerEnumType,
} from '@nestjs/graphql';
import { RefundType } from '@prisma-client';

registerEnumType(RefundType, { name: 'RefundType' });

@InputType()
export class AskForRefundInput {
  @Field(() => RefundType)
  type: RefundType;

  @Field(() => ID)
  orderItemId: string;

  @Field(() => Boolean, { nullable: true })
  fullAmount: boolean;

  @Field(() => Float, { nullable: true })
  amount: number;

  @Field(() => String, { nullable: true, defaultValue: '' })
  reason: string;

  @Field(() => Int)
  qty: number;

  @Field(() => Boolean)
  opened: boolean;
}
