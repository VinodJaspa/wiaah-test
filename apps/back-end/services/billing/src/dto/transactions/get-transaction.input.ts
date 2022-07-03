import { Field, InputType, Int } from '@nestjs/graphql';
import { TransactionStatus } from '@prisma-client';

@InputType()
export class GetTransactionsInput {
  @Field((type) => Int, { nullable: true })
  take: number;

  @Field((type) => TransactionStatus, { nullable: true })
  status: TransactionStatus;
}
