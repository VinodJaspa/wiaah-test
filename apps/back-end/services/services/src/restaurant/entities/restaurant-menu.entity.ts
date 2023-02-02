import { Directive, Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RestaurantMenu {
  @Field(() => ID)
  id: string;

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
}
