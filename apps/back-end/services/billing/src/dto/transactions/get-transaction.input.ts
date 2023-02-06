import { Field, InputType, Int } from '@nestjs/graphql';
import { TransactionStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetTransactionsInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field((type) => TransactionStatus, { nullable: true })
  status: TransactionStatus;
}
