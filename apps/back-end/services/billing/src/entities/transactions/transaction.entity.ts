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

  @Field(() => String)
  from: string;

  @Field(() => String)
  description: string;

  @Field((type) => TransactionStatus)
  status: TransactionStatus;

  @Field((type) => ID)
  userId: string;

  @Field((type) => Int)
  amount: number;

  @Field(() => String)
  currency: string;
}
