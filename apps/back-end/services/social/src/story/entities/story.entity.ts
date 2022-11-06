import { Attachment } from '@entities';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { StoryView } from './story-view.entity';

@ObjectType()
export class Story {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  publisherId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  referenceId?: string;

  @Field(() => String, { nullable: true })
  referenceType?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Int)
  reactionsNum: number;

  @Field(() => Attachment, { nullable: true })
  attachements?: Attachment;

  @Field(() => Int)
  viewsCount: number;

  @Field(() => [StoryView], { nullable: true })
  views?: StoryView[];
}
