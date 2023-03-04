import {
  ObjectType,
  Field,
  Int,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { WithdrawalStatus } from '@prisma-client';

registerEnumType(WithdrawalStatus, { name: 'WithdrawalStatus' });

@ObjectType()
export class WithdrawalRequest {
  @Field(() => ID)
  id: number;

  @Field(() => ID)
  userId: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  requestedAt: string;

  @Field(() => String)
  processedAt: string;

  @Field(() => String)
  financialAccountId: string;

  @Field(() => WithdrawalStatus)
  status: WithdrawalStatus;
}
