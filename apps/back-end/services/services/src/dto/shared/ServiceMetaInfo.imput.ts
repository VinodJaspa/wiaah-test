import { Field, InputType } from '@nestjs/graphql';
import { CreateInputGqlTranslationInputField } from 'nest-utils';

@InputType()
export class ServiceMetaInfoInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  metaTagDescription: string;

  @Field(() => [String])
  metaTagKeywords: string[];

  @Field(() => [String])
  hashtags: string[];
}

@InputType()
export class ServiceMetaInfoTranslationInput extends CreateInputGqlTranslationInputField<ServiceMetaInfoInput>(
  ServiceMetaInfoInput,
) {}
