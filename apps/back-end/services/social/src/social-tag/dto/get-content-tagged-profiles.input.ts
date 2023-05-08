import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetContentTaggedProfilesInput {
  @Field(() => String)
  contentId: string;

  @Field(() => String)
  contentType: string;
}
