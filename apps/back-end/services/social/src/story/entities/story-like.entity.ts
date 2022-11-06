import { User } from '@entities';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class StoryLike {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  storyId: string;

  @Field(() => ID)
  userId: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
