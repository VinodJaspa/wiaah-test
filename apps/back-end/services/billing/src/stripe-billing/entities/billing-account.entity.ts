import {
  Field,
  Int,
  ObjectType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { FieldRequired } from 'nest-utils';

export enum BillingAccountBusinessType {
  company = 'company',
  individual = 'individual',
}

registerEnumType(BillingAccountBusinessType, {
  name: 'BillingAccountBusinessType',
});

@ObjectType()
export class BillingAccountAddress {
  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  postal_code: string;

  @Field(() => String)
  line1: string;

  @Field(() => String)
  state: string;
}

const billingAccountAddress = PartialType(BillingAccountAddress);

@ObjectType()
export class BillingAccountDateOfBirth {
  @Field(() => Int)
  day: number;

  @Field(() => Int)
  month: number;

  @Field(() => Int)
  year: number;
}

const billingAccountDateOfBirth = PartialType(BillingAccountDateOfBirth);

@ObjectType()
export class billingAccountIndividual {
  @Field(() => BillingAccountAddress)
  address: BillingAccountAddress;

  @Field(() => BillingAccountDateOfBirth)
  dob: BillingAccountDateOfBirth;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String, { nullable: true })
  id_number?: string;

  @Field(() => String, { nullable: true })
  ssn_last_4?: string;
}

@ObjectType()
class BillingAccountIndividual extends PartialType(billingAccountIndividual) {}

@ObjectType()
export class billingAccountCompany {
  @Field(() => billingAccountAddress)
  address: BillingAccountAddress;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  tax_id: string;
}

@ObjectType()
class BillingAccountCompany extends PartialType(billingAccountCompany) {}

@ObjectType()
export class BillingAccountExternalAccount {
  @Field(() => String)
  account_number: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  currency: string;
}

const billingAccountExternalAccount = PartialType(
  BillingAccountExternalAccount,
);

@ObjectType()
export class CompanyPersonRelationship {
  @Field(() => Boolean)
  owner: boolean;

  @Field(() => Boolean)
  representative: boolean;

  @Field(() => Boolean)
  director: boolean;

  @Field(() => Boolean)
  executive: boolean;

  @Field(() => String)
  title: string;
}

export const companyPersonRelationship = PartialType(CompanyPersonRelationship);

@ObjectType()
export class companyPerson {
  @Field(() => String)
  id: string;

  @Field(() => billingAccountAddress)
  address: BillingAccountAddress;

  @Field(() => billingAccountDateOfBirth)
  dob: BillingAccountDateOfBirth;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String, { nullable: true })
  id_number?: string;

  @Field(() => companyPersonRelationship)
  relationship: CompanyPersonRelationship;
}

@ObjectType()
export class CompanyPerson extends PartialType(companyPerson) {}

@ObjectType()
export class BillingAccountBusinessProfile {
  @Field(() => String)
  mcc: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  url: string;
}

const billingAccountBusinessProfile = PartialType(
  BillingAccountBusinessProfile,
);

@ObjectType()
export class BillingAccount {
  @Field(() => BillingAccountBusinessType, { nullable: true })
  businessType?: BillingAccountBusinessType;

  // @Field(() => billingAccountBusinessProfile, { nullable: true })
  // business_profile?: BillingAccountBusinessProfile;

  // @Field(() => billingAccountExternalAccount, { nullable: true })
  // external_account?: BillingAccountExternalAccount;

  @Field(() => BillingAccountIndividual, { nullable: true })
  individual?: BillingAccountIndividual;

  @Field(() => BillingAccountCompany, { nullable: true })
  company?: BillingAccountCompany;

  @Field(() => [CompanyPerson], { nullable: true })
  @FieldRequired('business_type', BillingAccountBusinessType.company, {
    message: `Company members information is required for accounts with business type of company`,
  })
  companyMembers?: CompanyPerson[];
}
