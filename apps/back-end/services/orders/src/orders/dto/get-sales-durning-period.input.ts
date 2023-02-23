import {
  Field,
  InputType,
  Int,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { OrderStatusEnum } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

export enum OrderSearchPeriod {
  day = 'day',
  month = 'month',
  week = 'week',
}

registerEnumType(OrderSearchPeriod, { name: 'OrderSearchPeriod' });

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

  @Field(() => OrderSearchPeriod)
  searchPeriod: OrderSearchPeriod;
}

@InputType()
export class GetSalesDurningPeriodInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
