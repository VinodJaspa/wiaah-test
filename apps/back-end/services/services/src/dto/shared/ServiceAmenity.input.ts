import { TranslationsInput } from '@decorators';
import { Field, InputType } from '@nestjs/graphql';
import { CreateGqlTranslationInputField } from 'nest-utils';

@InputType()
export class ServiceAmenitiesLabelTranslationInput extends CreateGqlTranslationInputField(
  String,
) {}

@InputType()
export class ServiceAmenitiesInput {
  @Field(() => String)
  value: string;

  @Field(() => [ServiceAmenitiesLabelTranslationInput])
  @TranslationsInput()
  label: ServiceAmenitiesLabelTranslationInput[];
}
