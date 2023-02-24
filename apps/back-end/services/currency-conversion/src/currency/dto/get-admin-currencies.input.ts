import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  title: string;

  @Field(() => String)
  code: string;

  @Field(() => Float)
  rate: number;

  @Field(() => Boolean)
  enabled: boolean;
}

@InputType()
export class AdminGetCurrenciesInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
