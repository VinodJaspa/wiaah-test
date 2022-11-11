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
@Directive('@key(fields:"id")')
@Directive('@key(fields:"membershipId")')
export class Account {
  @Field((type) => ID)
  id: string;

  @Field(() => String, { nullable: true })
  stripeId: string;

  @Field(() => ID, { nullable: true })
  membershipId: string;

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

  @Field(() => String, { nullable: true })
  companyRegisterationNumber?: string;
}
