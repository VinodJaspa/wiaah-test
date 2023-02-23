import {
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { OrderStatusEnum } from '@prisma-client';
import { Account, Product } from './extends';

registerEnumType(OrderStatusEnum, { name: 'OrderStatusEnum' });

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  qty: number;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => Float, { nullable: true })
  paid: number;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  paidAt: Date;

  @Field(() => Boolean)
  refundable: boolean;

  @Field(() => String, { nullable: true })
  discountId?: string;

  @Field(() => String, { nullable: true })
  cashbackId?: string;

  @Field(() => String, { nullable: true })
  affiliationId?: string;

  @Field(() => String)
  orderId: string;

  @Field(() => OrderStatusEnum)
  status: OrderStatusEnum;

  @Field(() => String, { nullable: true })
  rejectReason?: string;
}

@ObjectType()
export class OrderStatus {
  @Field((type) => OrderStatusEnum)
  of: OrderStatusEnum;

  @Field((type) => String, { nullable: true })
  rejectReason?: string;
}

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => Account, { nullable: true })
  seller?: Account;

  @Field(() => ID)
  buyerId: string;

  @Field(() => Account, { nullable: true })
  buyer?: Account;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [OrderItem])
  items: OrderItem[];

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => String)
  shippingAddressId: string;

  @Field(() => String)
  billingAddressId: string;

  @Field(() => String)
  shippingMethodId: string;

  @Field(() => Float, { defaultValue: 0 })
  paid?: number;

  // @Field(() => Discount, { nullable: true })
  // discount?: Discount;
}
