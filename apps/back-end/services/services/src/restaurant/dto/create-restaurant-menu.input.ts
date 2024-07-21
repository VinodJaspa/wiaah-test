import { TranslationsInput } from '@decorators';
import { TranslationTextInput, TranslationTextArrayInput } from '@dto';
import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';

@InputType()
export class RestaurantMenuDishInput {
  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  name: TranslationTextInput[];

  @Field(() => Int)
  price: number;

  @Field(() => [TranslationTextArrayInput])
  @TranslationsInput()
  ingredients: TranslationTextArrayInput[];

  @Field(() => String)
  thumbnail: string;
}

@InputType()
export class RestaurantMenuInput {
  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  name: TranslationTextInput[];

  @Field(() => [RestaurantMenuDishInput])
  dishs: RestaurantMenuDishInput[];
}
