import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { OrderStatusEnum } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class input {
  @Field(() => String)
  productName: string;

  @Field(() => String)
  seller: string;

  @Field(() => String)
  buyer: string;

  @Field(() => Int)
  qty: number;

  @Field(() => String)
  address: string;

  @Field(() => OrderStatusEnum)
  status: OrderStatusEnum;
}

@InputType()
export class GetSalesDurningPeriodInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
