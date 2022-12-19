import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetFilteredOrdersInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

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
}
