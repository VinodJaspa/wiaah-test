import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { AccountType } from '@prisma-client';

registerEnumType(AccountType, { name: 'AccountType' });

@ObjectType()
// @Directive('@key(fields: "id")')
export class Account {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  email: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => AccountType)
  type: AccountType;
}
