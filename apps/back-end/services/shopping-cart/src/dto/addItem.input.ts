import { Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { ShoppingCartItemType } from '@prisma-client';

registerEnumType(ShoppingCartItemType, { name: 'ShoppingCartItemType' });

@InputType()
export class CartItemAttributeInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  value: string;
}

@InputType()
export class AddShoppingCartItemInput {
  @Field(() => ShoppingCartItemType)
  type: ShoppingCartItemType;

  @Field((type) => ID)
  itemId: string;

  @Field(() => ID)
  shippingRuleId: string;

  @Field((type) => Int)
  quantity: number;

  @Field(() => [CartItemAttributeInput], { nullable: true })
  attributes?: CartItemAttributeInput[];
}
