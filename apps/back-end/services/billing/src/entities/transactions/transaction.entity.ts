import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { TransactionStatus } from '@prisma-client';
import { Account } from '../external';

registerEnumType(TransactionStatus, { name: 'TransactionStatus' });

@ObjectType()
export class Transaction {
  @Field((type) => ID)
  id: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => TransactionStatus)
  status: TransactionStatus;

  @Field((type) => ID)
  userId: string;

  @Field(() => Account)
  user: Account;

  @Field((type) => Int)
  amount: number;
}
