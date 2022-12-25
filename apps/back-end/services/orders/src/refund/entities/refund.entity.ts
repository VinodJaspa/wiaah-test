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
  productId: string;

  @Field(() => String)
  reason: string;

  @Field(() => RefundType)
  type: RefundType;

  @Field(() => RefundStatusType)
  status: RefundStatusType;

  @Field(() => String)
  rejectReason: string;

  @Field(() => Float)
  amount: number;
}
