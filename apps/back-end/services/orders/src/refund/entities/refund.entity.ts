import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { RefundType } from '@prisma-client';

@ObjectType()
export class Refund {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  requestedById: string;

  @Field(() => ID)
  orderId: string;

  @Field(() => String)
  reason: string;

  @Field(() => RefundType)
  type: RefundType;

  @Field(() => Float)
  amount: number;
}
