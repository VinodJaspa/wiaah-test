import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum BillingAccountBusinessType {
  company = 'company',
  individual = 'individual',
}

registerEnumType(BillingAccountBusinessType, {
  name: 'BillingAccountBusinessType',
});

@ObjectType()
export class BillingAccountIndividualAddress {
  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  postal_code: string;

  @Field(() => String)
  line1: string;
}

@ObjectType()
export class BillingAccountDateOfBirth {
  @Field(() => Int)
  day: number;

  @Field(() => Int)
  month: number;

  @Field(() => Int)
  year: number;
}

@ObjectType()
export class BillingAccountIndividual {
  @Field(() => BillingAccountIndividualAddress)
  address: BillingAccountIndividualAddress;

  @Field(() => BillingAccountDateOfBirth)
  dob: BillingAccountDateOfBirth;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  ssn_last_4: string;
}

// @ObjectType()
// export class BillingAccountCompany {}

@ObjectType()
export class BillingAccountExternalAccount {
  @Field(() => String)
  account_number: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  currency: string;
}

@ObjectType()
export class BillingAccountBusinessProfile {
  @Field(() => String)
  mcc: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class BillingAccount {
  @Field(() => BillingAccountBusinessType)
  businessType: BillingAccountBusinessType;

  @Field(() => BillingAccountBusinessProfile)
  business_profile: BillingAccountBusinessProfile;

  @Field(() => BillingAccountExternalAccount)
  external_account: BillingAccountExternalAccount;

  @Field(() => BillingAccountIndividual, { nullable: true })
  individual?: BillingAccountIndividual;

  //   @Field(() => BillingAccountCompany, { nullable: true })
  //   company?: BillingAccountCompany;
}
