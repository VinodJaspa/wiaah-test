import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RestaurantMenu {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [RestaurantDish])
  dishs: RestaurantDish[];
}

@ObjectType()
export class RestaurantDish {
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
}
