import { InputType } from '@nestjs/graphql';
import {
  CreateGqlTranslationInputField,
  CreateGqlTranslationInputFields,
} from 'nest-utils';

@InputType()
export class TranslationTextInput extends CreateGqlTranslationInputField(
  String,
) {}

@InputType()
export class TranslationTextArrayInput extends CreateGqlTranslationInputFields(
  String,
) {}
