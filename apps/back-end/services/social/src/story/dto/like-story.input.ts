import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class LikeStoryInput {
  @Field(() => ID)
  storyId: string;
}
