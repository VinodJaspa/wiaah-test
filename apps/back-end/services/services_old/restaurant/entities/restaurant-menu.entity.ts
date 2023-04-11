import {
  Directive,
  Field,
  Float,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { RestaurantDishType } from 'prismaClient';

registerEnumType(RestaurantDishType, { name: 'RestaurantDishType' });

@ObjectType()
export class RestaurantMenu {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  restaurantId: string;

  @Field(() => String)
  name: string;

  @Field(() => [Dish])
  dishs: Dish[];
}

@ObjectType()
@Directive('@key(fields:"id")')
export class Dish {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => [String])
  ingredients: string[];

  @Field(() => String)
  thumbnail: string;

  @Field(() => ID)
  menuId: string;

  @Field(() => RestaurantDishType)
  type: RestaurantDishType;

  @Field(() => Int)
  sales: number;
}
