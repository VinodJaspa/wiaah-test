import { Field, InputType } from '@nestjs/graphql';
import { CreateGqlTranslationInputFields } from 'nest-utils';

@InputType()
export class ServiceIncludedAmenitiesInput extends CreateGqlTranslationInputFields(
  String,
) {}
