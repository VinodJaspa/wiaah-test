import {
  ObjectType,
  Field,
  ID,
  registerEnumType,
  Directive,
  Int,
} from '@nestjs/graphql';
import { AppliedVoucher } from '@entities';
import { BookedService } from '../book-service';

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

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  qty: number;

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

  @Field(() => [BookedService], { nullable: true })
  cartServices?: BookedService[];

  @Field(() => [CartProduct], { nullable: true })
  cartProduct?: CartProduct[];

  @Field(() => ID, { nullable: true })
  appliedVoucherId?: String;
}
