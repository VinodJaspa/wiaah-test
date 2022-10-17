import { TranslationText, TranslationTextArray } from '@dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RestaurantMenuDishInput {
  @Field(() => [TranslationText])
  name: TranslationText[];

  @Field(() => Int)
  price: number;

  @Field(() => [TranslationTextArray])
  ingredients: TranslationTextArray[];

  @Field(() => String)
  thumbnail: string;
}

@InputType()
export class RestaurantMenuInput {
  @Field(() => [TranslationText])
  name: TranslationText[];

  @Field(() => [RestaurantMenuDishInput])
  dishs: RestaurantMenuDishInput[];
}
