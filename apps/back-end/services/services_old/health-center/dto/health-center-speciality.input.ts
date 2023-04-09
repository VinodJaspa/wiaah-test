import { TranslationTextInput } from '@dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class HealthCenterSpecialityInput {
  @Field(() => [TranslationTextInput])
  name: TranslationTextInput;

  @Field(() => [TranslationTextInput])
  description: TranslationTextInput[];
}
