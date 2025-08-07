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
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  stripeId?: string;

  @Field(() => ID, { nullable: true })
  membershipId?: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => Boolean)
  phoneVerified: boolean;


  @Field(() => Boolean)
  idVerified: boolean;

  @Field(() => Boolean)
  verified: boolean;

  @Field(() => Boolean)
  online: boolean;

  @Field(() => String)
  gender: string;

  @Field(() => String, { nullable: true })
  country?: string;
  

  @Field(() => Number)
  sales: number;

  @Field(() => AccountType)
  accountType: AccountType;

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

  @Field(() => Date)
  lastActiveAt: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  birthDate: Date;

  @Field(() => String)
  lang: string;

  @Field(() => String)
  currency: string;
  @Field()
  shareAdPartners: boolean;

  @Field()
  shareAnalyticsTools: boolean;

  @Field()
  shareSocialNetworks: boolean;

  @Field()
  sharePaymentProcessors: boolean;
}
