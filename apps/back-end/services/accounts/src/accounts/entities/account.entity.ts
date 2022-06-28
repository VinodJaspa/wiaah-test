import {
  ObjectType,
  Field,
  ID,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';
import { AccountType } from '@prisma-client';

registerEnumType(AccountType, { name: 'AccountType' });

@ObjectType()
// @Directive('@extends')
export class Account {
  @Field((type) => ID)
  // @Directive('@external')
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

  @Field((type) => Boolean)
  verified: boolean;
}
