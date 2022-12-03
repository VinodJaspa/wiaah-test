import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteStoryInput {
  @Field(() => ID)
  storyId: string;
}
