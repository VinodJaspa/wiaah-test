import { TranslationsInput } from '@decorators';
import { TranslationTextInput } from '@dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBeautyCenterTreatmentCategoryInput {
  @Field(() => [TranslationTextInput])
  @TranslationsInput()
  title: TranslationTextInput[];
}
