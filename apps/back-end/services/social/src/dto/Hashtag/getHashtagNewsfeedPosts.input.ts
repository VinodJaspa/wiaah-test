import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class GetHashtagNewsfeedPostsInput {
  @Field(() => String)
  tag: string;

  @Field(() => ID)
  profileId: string;

  @Field(() => ID)
  userId: string;
}
