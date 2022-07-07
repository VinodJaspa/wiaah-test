import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { CartItemType } from '@prisma-client';
import { AppliedVoucher } from '@entities';

registerEnumType(CartItemType, { name: 'CartItemType' });

@ObjectType()
export class CartItem {
  @Field((type) => ID)
  itemId: string;

  @Field((type) => CartItemType)
  itemType: CartItemType;

  @Field((type) => String)
  thumbnail: string;

  @Field((type) => String)
  name: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int)
  quantity: number;

  @Field((type) => ID)
  providerId: string;
}

@ObjectType()
export class ShoppingCart {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => [CartItem])
  cartItems: CartItem[];

  @Field((type) => AppliedVoucher, { nullable: true })
  appliedVoucher?: AppliedVoucher;
}
