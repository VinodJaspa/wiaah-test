import {
  ObjectType,
  Field,
  ID,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';
import { AppliedVoucher } from '@entities';
import { BookedService } from '../book-service';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
class Product {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
class ShippingRule {
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

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => ID)
  shippingRuleId: string;

  @Field(() => ShippingRule, { nullable: true })
  shippingRule?: ShippingRule;
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

  @Field(() => AppliedVoucher, { nullable: true })
  appliedVoucher?: AppliedVoucher;
}
