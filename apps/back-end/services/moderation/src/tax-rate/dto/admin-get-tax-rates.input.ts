import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  rate: number;
}

@InputType()
export class AdminGetTaxRatesInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
