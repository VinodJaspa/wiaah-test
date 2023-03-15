import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddShoppingCartProductItemInput {
  @Field((type) => ID)
  itemId: string;

  @Field(() => ID)
  shippingRuleId: string;

  @Field((type) => Int)
  quantity: number;

  @Field(() => String, { nullable: true })
  attributesJson?: string;
}
