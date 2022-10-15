import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceMetaInfo {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  metaTagDescription: string;

  @Field(() => String)
  metaTagKeywords: string;

  @Field(() => String)
  serviceTag: string;

  @Field(() => [String])
  hashtags: string[];
}
