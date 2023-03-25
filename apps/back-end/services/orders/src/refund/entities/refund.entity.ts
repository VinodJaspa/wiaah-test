import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { RefundStatusType, RefundType } from '@prisma-client';

registerEnumType(RefundStatusType, { name: 'RefundStatusType' });

@ObjectType()
export class Refund {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  requestedById: string;

  @Field(() => ID)
  orderItemId: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => String)
  reason: string;

  @Field(() => RefundType)
  type: RefundType;

  @Field(() => Float)
  amount: number;

  @Field(() => Boolean)
  fullAmount: boolean;

  @Field(() => Int)
  qty: number;

  @Field(() => RefundStatusType)
  status: RefundStatusType;

  @Field(() => String, { nullable: true })
  rejectReason?: string;

  @Field(() => Boolean)
  opened: boolean;

  @Field(() => String)
  createdAt: Date;
}
