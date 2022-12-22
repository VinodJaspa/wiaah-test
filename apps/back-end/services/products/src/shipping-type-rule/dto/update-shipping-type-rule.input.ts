import { CreateShippingTypeRuleInput } from './create-shipping-type-rule.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShippingTypeRuleInput extends PartialType(CreateShippingTypeRuleInput) {
  @Field(() => Int)
  id: number;
}
