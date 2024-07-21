import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateGqlInputTranslationInputFields,
  CreateGqlObjectTranslationInputFields,
} from 'nest-utils';

@ObjectType()
export class ServicePolicy {
  @Field(() => String)
  policyTitle: string;

  @Field(() => [String])
  terms: string[];
}

@ObjectType()
export class ServiceTranslationPolicy extends CreateGqlObjectTranslationInputFields(
  ServicePolicy,
) { }
