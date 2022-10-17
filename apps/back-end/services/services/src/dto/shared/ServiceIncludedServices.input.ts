import { InputType } from '@nestjs/graphql';
import { CreateGqlTranslationInputFields } from 'nest-utils';

@InputType()
export class ServiceIncludedServicesInput extends CreateGqlTranslationInputFields(
  String,
) {}
