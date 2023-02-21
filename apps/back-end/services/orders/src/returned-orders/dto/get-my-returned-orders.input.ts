import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  productName: string;

  @Field(() => String)
  sellerName: string;

  @Field(() => String)
  buyerName: string;

  @Field(() => Int)
  qty: number;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  shippingAmount: number;

  @Field(() => String)
  reason: string;
}

@InputType()
export class GetMyReturnedOrdersInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}

@InputType()
export class AdminGetReturnedOrdersInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
