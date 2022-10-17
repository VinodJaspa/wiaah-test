import { TranslationText } from '@entities';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantSettingAndAmbianceInput {
  @Field(() => [TranslationText])
  name: TranslationText[];
}
