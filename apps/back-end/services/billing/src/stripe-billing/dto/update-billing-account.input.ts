import { Field, InputType, Int } from '@nestjs/graphql';
import { BillingAccountBusinessType } from '@stripe-billing/entities/billing-account.entity';

@InputType()
export class BillingAccountAddressInput {
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

@InputType()
export class BillingAccountDateOfBirthInput {
  @Field(() => Int)
  day: number;

  @Field(() => Int)
  month: number;

  @Field(() => Int)
  year: number;
}

@InputType()
export class BillingAccountIndividualInput {
  @Field(() => BillingAccountAddressInput)
  address: BillingAccountAddressInput;

  @Field(() => BillingAccountDateOfBirthInput)
  dob: BillingAccountDateOfBirthInput;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  ssn_last_4: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  id_number: string;
}

@InputType()
export class BillingAccountExternalAccountInput {
  @Field(() => String)
  account_number: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  object: string;

  @Field(() => String)
  routing_number: string;
}

@InputType()
export class BillingAccountBusinessProfileInput {
  @Field(() => String)
  mcc: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  url: string;
}

@InputType()
export class BillingAccountCompanyInput {
  @Field(() => BillingAccountAddressInput)
  address: BillingAccountAddressInput;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  tax_id: string;
}

@InputType()
export class CreateBillingAccountInput {
  @Field(() => BillingAccountBusinessType)
  business_type: BillingAccountBusinessType;

  @Field(() => BillingAccountBusinessProfileInput)
  business_profile: BillingAccountBusinessProfileInput;

  @Field(() => BillingAccountExternalAccountInput)
  external_account: BillingAccountExternalAccountInput;

  @Field(() => BillingAccountIndividualInput, { nullable: true })
  individual?: BillingAccountIndividualInput;

  @Field(() => BillingAccountCompanyInput, { nullable: true })
  company?: BillingAccountCompanyInput;
}

@InputType()
export class UpdateBillingAccountInput {}
