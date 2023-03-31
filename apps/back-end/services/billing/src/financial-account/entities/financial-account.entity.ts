import {
  ObjectType,
  Field,
  ID,
  Directive,
  registerEnumType,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { FinancialAccountType } from '@prisma-client';

registerEnumType(FinancialAccountType, { name: 'FinancialAccountType' });

@ObjectType()
class required {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => String)
  financialId: string;

  @Field(() => String)
  label: string;

  @Field(() => String)
  currency: string;

  @Field(() => FinancialAccountType)
  type: FinancialAccountType;
}

@ObjectType()
class optional {
  @Field(() => String)
  card_exp_month: string;

  @Field(() => String)
  card_exp_year: string;

  @Field(() => String)
  card_number: string;

  @Field(() => String)
  card_cvc: string;

  @Field(() => String)
  bank_number: string;

  @Field(() => String)
  bank_country: string;
}

@ObjectType()
@Directive('@key(fields:"id")')
export class FinancialAccount extends IntersectionType(
  required,
  PartialType(optional),
) {}
