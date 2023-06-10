import {
  ObjectType,
  Field,
  ID,
  Directive,
  registerEnumType,
  Int,
} from '@nestjs/graphql';
import { ShoppingCartItemType } from '@prisma-client';

registerEnumType(ShoppingCartItemType, { name: 'ShoppingCartItemType' });

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Product {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class ShippingRule {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
export class CartItemAttribute {
  @Field(() => String)
  id: string;

  @Field(() => [String])
  value: string[];
}

@ObjectType()
export class CartItem {
  @Field(() => String)
  id: string;

  @Field(() => String)
  ownerId: string;

  @Field(() => ID)
  itemId: string;

  @Field(() => ShoppingCartItemType)
  itemType: ShoppingCartItemType;

  @Field(() => [CartItemAttribute])
  attributes: CartItemAttribute[];

  @Field(() => ID, { nullable: true })
  shippingRuleId?: string;

  @Field(() => String, { nullable: true })
  checkin?: Date;

  @Field(() => String, { nullable: true })
  checkout?: Date;

  @Field(() => Int, { nullable: true })
  guests?: number;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => String, { nullable: true })
  size?: string;
}

@ObjectType()
export class ShoppingCart {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => [CartItem], { nullable: true })
  cartProduct?: CartItem[];

  @Field(() => ID, { nullable: true })
  appliedVoucherId?: String;
}
