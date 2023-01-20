import { Field, InputType } from '@nestjs/graphql';
import { CreateGqlInputTranslationInputFields } from 'nest-utils';

@InputType()
export class ServiceIncludedAmenitiesInput extends CreateGqlInputTranslationInputFields(
  String,
) {}
