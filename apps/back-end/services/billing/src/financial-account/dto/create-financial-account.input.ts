import { CreateBillingAddressInput } from '@dto';
import { BillingAddress } from '@entities';
import {
  InputType,
  Field,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { FinancialAccountType } from '@prisma-client';
import { FieldRequired } from 'nest-utils';

@InputType()
class required {
  @Field(() => String)
  currency: string;

  @Field(() => FinancialAccountType)
  type: FinancialAccountType;
}

@InputType()
class optional {
  @Field(() => String)
  label: string;

  @Field(() => String)
  @FieldRequired('type', FinancialAccountType.card)
  card_exp_month: string;

  @Field(() => String)
  @FieldRequired('type', FinancialAccountType.card)
  card_exp_year: string;

  @Field(() => String)
  @FieldRequired('type', FinancialAccountType.card)
  card_number: string;

  @Field(() => String)
  @FieldRequired('type', FinancialAccountType.card)
  card_cvc: string;

  @Field(() => String)
  @FieldRequired('type', FinancialAccountType.bank)
  bank_number: string;

  @Field(() => String)
  @FieldRequired('type', FinancialAccountType.bank)
  bank_country: string;
}

@InputType()
export class CreateFinancialAccountInput extends IntersectionType(
  required,
  PartialType(optional),
) {}
