import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { TransactionStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class input {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => String)
  seller: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  description: string;

  @Field(() => String)
  id: string;

  @Field(() => TransactionStatus)
  status: TransactionStatus;
}

@InputType()
export class GetTransactionsAdminInput extends PartialType(input) {}
