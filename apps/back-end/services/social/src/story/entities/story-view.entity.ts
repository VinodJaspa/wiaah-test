import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Story } from './story.entity';

@ObjectType()
export class StoryView {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  viewerId: string;

  @Field(() => ID)
  storyId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Story, { nullable: true })
  story?: Story;
}
