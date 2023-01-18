import { InputType } from '@nestjs/graphql';
import {
  CreateInputGqlTranslationInputField,
  CreateGqlInputTranslationInputFields,
} from 'nest-utils';

@InputType()
export class TranslationTextInput extends CreateInputGqlTranslationInputField(
  String,
) {}

@InputType()
export class TranslationTextArrayInput extends CreateGqlInputTranslationInputFields(
  String,
) {}
