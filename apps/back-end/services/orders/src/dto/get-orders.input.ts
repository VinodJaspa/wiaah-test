import { Field, InputType } from '@nestjs/graphql';
import { OrderStatus, OrderStatusEnum } from '@prisma-client';

@InputType()
export class GetMyOrdersInput {
  @Field((type) => OrderStatusEnum, { nullable: true })
  status?: OrderStatusEnum;
}
