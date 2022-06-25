import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { CartItemType } from '@prisma-client';

@InputType()
export class AddShoppingCartItemInput {
  @Field((type) => ID)
  itemId: string;

  @Field((type) => CartItemType)
  itemType: CartItemType;

  @Field((type) => Int)
  quantity: number;
}
