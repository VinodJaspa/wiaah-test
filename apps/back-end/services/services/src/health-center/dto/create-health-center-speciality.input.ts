import { TranslationsInput } from '@decorators';
import { TranslationTextInput } from '@dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHealthCenterSpecialityInput {
  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  name: TranslationTextInput[];

  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  description: TranslationTextInput[];
}
