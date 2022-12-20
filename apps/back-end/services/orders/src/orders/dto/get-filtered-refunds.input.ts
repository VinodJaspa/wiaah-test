import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class input {
  @Field(() => String)
  seller: string;

  @Field(() => String)
  buyer: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  qty: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  shippingCost: number;
}

@InputType()
export class GetFilteredRefundsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
