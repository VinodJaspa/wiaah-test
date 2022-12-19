import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AccountDeletionRequestStatus } from '@prisma-client';
import { Account } from './account.entity';

registerEnumType(AccountDeletionRequestStatus, {
  name: 'AccountDeletionRequestStatus',
});

@ObjectType()
export class AccountDeletionRequest {
  @Field(() => ID)
  id: string;

  @Field(() => Account)
  account: Account;

  @Field(() => ID)
  accountId: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;

  @Field(() => AccountDeletionRequestStatus)
  status: AccountDeletionRequest;
}
