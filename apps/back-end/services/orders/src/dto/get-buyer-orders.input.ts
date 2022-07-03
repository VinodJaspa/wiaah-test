import { Field, InputType } from '@nestjs/graphql';
import { OrderStatusEnum } from '@prisma-client';

@InputType()
export class GetBuyerOrdersInput {
  @Field((type) => OrderStatusEnum, { nullable: true })
  status?: OrderStatusEnum;
}
