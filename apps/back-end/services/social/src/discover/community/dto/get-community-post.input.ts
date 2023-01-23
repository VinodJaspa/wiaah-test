import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetCommunityPostsInput {
  @Field(() => String)
  q: string;
}
