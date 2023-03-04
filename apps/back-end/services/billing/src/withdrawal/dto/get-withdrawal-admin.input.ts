import {
  Field,
  Float,
  ID,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { WithdrawalStatus } from '@prisma-client';
import { accountType, GqlPaginationInput } from 'nest-utils';

enum WithdrawAccountType {
  SELLER = accountType.SELLER,
  BUYER = accountType.BUYER,
}

registerEnumType(WithdrawAccountType, { name: 'WithdrawalAccountType' });

@InputType()
export class GetWithdrawalRequestsAdminFilters {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  requestedAt: string;

  @Field(() => String)
  processedAt: string;

  @Field(() => String)
  shop: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Float)
  amount: number;

  @Field(() => WithdrawalStatus)
  status: WithdrawalStatus;

  @Field(() => WithdrawAccountType)
  accountType: WithdrawAccountType;
}

@InputType()
export class GetWithdrawalRequestsAdminInput extends PartialType(
  GetWithdrawalRequestsAdminFilters,
) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
