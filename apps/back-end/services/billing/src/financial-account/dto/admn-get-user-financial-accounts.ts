import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AdminGetUserFinancialAccounts {
  @Field(() => String)
  accountId: string;
}
