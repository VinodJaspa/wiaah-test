import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateShippingRuleInput } from 'src/shipping-rules/dto/create-shipping-rule.input';

@InputType()
export class CreateShippingSettingInput {
  @Field((type) => ID)
  shopId: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => [CreateShippingRuleInput], { nullable: true })
  shippingRules: CreateShippingRuleInput[];
}
