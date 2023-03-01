import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTaxRateInput {
  @Field(() => String)
  title: string;

  @Field(() => Float)
  percent: number;

  @Field(() => [String])
  appliedOnCountryIds: string[];
}
