import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrderStatusEnum } from '@prisma-client';
import { Account } from './extends';
import { Discount } from './extends/discount.entity';

registerEnumType(OrderStatusEnum, { name: 'OrderStatusEnum' });

@ObjectType()
export class OrderItem {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  qty: number;

  @Field(() => String)
  type: string;
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

  @Field(() => Discount, { nullable: true })
  discount?: Discount;
}
