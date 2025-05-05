import { ServiceMetaInfoInput } from '@dto';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateInputGqlTranslationInputField,
  CreateObjectGqlTranslationInputField,
} from 'nest-utils';

@ObjectType()
export class ServiceMetaInfo {
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

@ObjectType()
export class ServiceMetaInfoTranslation extends CreateObjectGqlTranslationInputField(
  ServiceMetaInfo,
) {}
