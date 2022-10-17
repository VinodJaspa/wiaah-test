import { InputType } from '@nestjs/graphql';
import {
  CreateGqlTranslationInputField,
  CreateGqlTranslationInputFields,
} from 'nest-utils';

@InputType()
export class TranslationText extends CreateGqlTranslationInputField(String) {}

@InputType()
export class TranslationTextArray extends CreateGqlTranslationInputFields(
  String,
) {}
