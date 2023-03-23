import { Account } from '@entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProfileReachedGender } from 'prismaClient';
import { Story } from './story.entity';

@ObjectType()
export class StoryView {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  viewerId: string;

  @Field(() => Account, { nullable: true })
  viewer?: Account;

  @Field(() => ID)
  storyId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Story, { nullable: true })
  story?: Story;

  @Field(() => ProfileReachedGender)
  gender: ProfileReachedGender;
}
