import { Field, InputType } from '@nestjs/graphql';
import { CreateGqlTranslationInputFields } from 'nest-utils';

@InputType()
class ServicePolicyInput {
  @Field(() => String)
  policyTitle: string;

  @Field(() => [String])
  terms: string[];
}

@InputType()
export class ServicePolicyTranslatedInput extends CreateGqlTranslationInputFields(
  ServicePolicyInput,
) {}
