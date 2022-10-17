import { TranslationsInput } from '@decorators';
import { TranslationText, TranslationTextArray } from '@dto';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RestaurantMenuDishInput {
  @Field(() => [TranslationText])
  @TranslationsInput()
  name: TranslationText[];

  @Field(() => Int)
  price: number;

  @Field(() => [TranslationTextArray])
  @TranslationsInput()
  ingredients: TranslationTextArray[];

  @Field(() => String)
  thumbnail: string;
}

@InputType()
export class RestaurantMenuInput {
  @Field(() => [TranslationText])
  @TranslationsInput()
  name: TranslationText[];

  @Field(() => [RestaurantMenuDishInput])
  dishs: RestaurantMenuDishInput[];
}
