import { Field, InputType } from '@nestjs/graphql';
import { OrderStatus, OrderStatusEnum } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetMyOrdersInput {
  @Field((type) => OrderStatusEnum, { nullable: true })
  status?: OrderStatusEnum;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
