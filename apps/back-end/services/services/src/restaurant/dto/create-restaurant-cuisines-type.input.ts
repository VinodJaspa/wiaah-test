import { TranslationText } from '@entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantCuisinesTypeInput {
  @Field(() => [TranslationText])
  name: TranslationText[];
}
