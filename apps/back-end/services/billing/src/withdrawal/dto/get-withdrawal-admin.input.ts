import { Field, Float, ID, InputType, PartialType } from '@nestjs/graphql';
import { WithdrawalStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

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
  seller: string;

  @Field(() => String)
  email: string;

  @Field(() => Float)
  amount: number;

  @Field(() => WithdrawalStatus)
  status: WithdrawalStatus;
}

@InputType()
export class GetWithdrawalRequestsAdminInput extends PartialType(
  GetWithdrawalRequestsAdminFilters,
) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
