import { ServicePaymentMethodInput } from '@dto';
import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class Input extends ExtendableGqlPaginationInput {
  @Field(() => String)
  query: string;

  @Field(() => String)
  specialistType: string;

  @Field(() => String)
  speakingLanguage: string;

  @Field(() => [ServicePaymentMethodInput])
  payment_methods: ServicePaymentMethodInput[];

  @Field(() => Int)
  rate: number;

  @Field(() => Float)
  minPrice: number;

  @Field(() => Float)
  maxPrice: number;
}

@InputType()
export class SearchHealthCenterInput extends PartialType(Input) {}
