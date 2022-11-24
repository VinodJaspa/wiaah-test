import { Attachment, PostLocation } from '@entities';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { CommentsVisibility, PostVisibility } from 'prismaClient';

@ObjectType()
export class Action {
  @Field(() => ID)
  id: string;

  @Field(() => Attachment)
  attachment: Attachment;

  @Field(() => ID)
  userId: string;

  @Field(() => Int)
  reactionNum: number;

  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  shares: number;

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => PostLocation)
  location: PostLocation;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;
}
