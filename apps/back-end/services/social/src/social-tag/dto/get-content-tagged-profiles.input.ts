import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetContentTaggedProfilesInput {
  @Field(() => String)
  contentId: string;

  @Field(() => String)
  contentType: string;
}
