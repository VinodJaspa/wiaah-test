import { Field, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';

export enum ShoppingCartItemType {
  product = 'product',
  service = 'service',
}

registerEnumType(ShoppingCartItemType, { name: 'ShoppingCartItemType' });

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

  @Field(() => String, { nullable: true })
  attributesJson?: string;
}
