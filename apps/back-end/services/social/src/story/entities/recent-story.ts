import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecentStory {
  @Field(() => ID)
  userId: string;

  @Field(() => Boolean)
  newStory: boolean;
}
