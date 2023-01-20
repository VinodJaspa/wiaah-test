import { Field, InputType } from '@nestjs/graphql';
import { CreateGqlInputTranslationInputFields } from 'nest-utils';

@InputType()
class ServicePolicyInput {
  @Field(() => String)
  policyTitle: string;

  @Field(() => [String])
  terms: string[];
}

@InputType()
export class ServicePolicyTranslatedInput extends CreateGqlInputTranslationInputFields(
  ServicePolicyInput,
) {}
