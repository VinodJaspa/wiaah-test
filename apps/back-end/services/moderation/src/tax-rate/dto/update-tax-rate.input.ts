import { CreateTaxRateInput } from './create-tax-rate.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTaxRateInput extends PartialType(CreateTaxRateInput) {
  @Field(() => ID)
  id: string;
}
