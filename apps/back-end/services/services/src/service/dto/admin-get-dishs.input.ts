import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { RestaurantDishType } from 'prismaClient';

@InputType()
class input {
  @Field(() => String)
  name: string;

  @Field(() => String)
  seller: string;

  @Field(() => RestaurantDishType)
  type: RestaurantDishType;

  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => Int)
  sales: number;
}

@InputType()
export class AdminGetDishsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
