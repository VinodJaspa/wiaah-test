import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

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
export class CartProduct {
  @Field(() => String)
  id: string;

  @Field(() => String)
  ownerId: string;

  @Field(() => ID)
  productId: string;

  @Field(() => String)
  attributesJson: string;

  @Field(() => ID)
  shippingRuleId: string;
}

@ObjectType()
export class ShoppingCart {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  ownerId: string;

  @Field(() => [CartProduct], { nullable: true })
  cartProduct?: CartProduct[];

  @Field(() => ID, { nullable: true })
  appliedVoucherId?: String;
}
