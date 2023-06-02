import {
  ObjectType,
  Field,
  ID,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';
import { AccountStatus, AccountType } from '@prisma-client';

registerEnumType(AccountType, { name: 'AccountType' });
registerEnumType(AccountStatus, { name: 'AccountStatus' });

@ObjectType()
@Directive('@key(fields:"id")')
@Directive('@key(fields:"membershipId")')
@Directive('@key(fields:"membershipId, id")')
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
  accountType: AccountType;

  @Field((type) => Boolean)
  verified: boolean;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field(() => String, { nullable: true })
  companyRegisterationNumber?: string;

  @Field(() => String, { nullable: true })
  photo?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => [String])
  ips: string[];

  @Field(() => String)
  lastActiveAt: Date;

  @Field(() => String)
  lang: string;

  @Field(() => String)
  currency: string;
}
