import { Field, ID, InputType } from '@nestjs/graphql';
import { ShoppingCartItemType } from './addItem.input';

@InputType()
export class RemoveShoppingCartItemInput {
  @Field(() => ID)
  itemId: string;

  @Field(() => ShoppingCartItemType)
  type: ShoppingCartItemType;
}
