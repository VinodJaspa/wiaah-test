import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrderStatusEnum } from '@prisma-client';

registerEnumType(OrderStatusEnum, { name: 'OrderStatusEnum' });

@ObjectType()
export class OrderStatus {
  @Field((type) => OrderStatusEnum)
  of: OrderStatusEnum;

  @Field((type) => String, { nullable: true })
  rejectReason?: string;
}
