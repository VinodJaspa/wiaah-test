import { TranslationTextInput } from '@dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantSettingAndAmbianceInput {
  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];
}
