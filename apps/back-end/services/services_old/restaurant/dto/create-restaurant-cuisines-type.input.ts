import { TranslationTextInput } from '@dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantCuisinesTypeInput {
  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];
}
