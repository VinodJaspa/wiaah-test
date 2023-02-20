import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { OrderStatusEnum } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  date_from: string;

  @Field(() => String)
  date_to: string;

  @Field(() => Int)
  qty: number;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  buyer: string;

  @Field(() => String)
  seller: string;

  @Field(() => String)
  payment_method: string;

  @Field(() => String)
  id: string;

  @Field(() => OrderStatusEnum)
  status: OrderStatusEnum;

  @Field(() => Float)
  total: number;
}

@InputType()
export class GetFilteredOrdersInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
