import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateShippingRuleInput } from './create-shipping-rule.input';

@InputType()
export class UpdateShippingRuleInput extends PartialType(
  CreateShippingRuleInput,
) {
  @Field(() => ID)
  id: string;
}
