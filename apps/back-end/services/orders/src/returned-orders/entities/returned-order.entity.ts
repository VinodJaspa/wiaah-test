import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { RefundStatusType, RefundType } from '@prisma-client';

@ObjectType()
export class ReturnedOrder {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  orderItemId: string;

  @Field(() => String)
  reason: string;

  @Field(() => RefundType)
  type: RefundType;

  @Field(() => Float)
  amount: number;

  @Field(() => Float)
  fullAmount: number;

  @Field(() => RefundStatusType)
  status: RefundStatusType;

  @Field(() => String, { nullable: true })
  rejectReason?: string;

  @Field(() => String)
  createdAt: string;
}
