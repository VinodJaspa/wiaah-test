import { InputType } from '@nestjs/graphql';
import { CreateGqlInputTranslationInputFields } from 'nest-utils';

@InputType()
export class ServiceIncludedServicesInput extends CreateGqlInputTranslationInputFields(
  String,
) {}
