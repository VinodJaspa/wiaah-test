import { Attachment, PostLocation, PostTag } from '@entities';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { CreateGqlCursorPaginatedResponse } from 'nest-utils';
import { CommentsVisibility, PostVisibility } from 'prismaClient';

@ObjectType()
export class ActionEffect {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class Action {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  src: string;

  @Field(() => String)
  cover: string;

  @Field(() => String)
  link: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Int)
  reactionNum: number;

  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  views: number;

  @Field(() => Int)
  shares: number;

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => PostLocation)
  location: PostLocation;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;

  @Field(() => String)
  music: string;

  @Field(() => String, { nullable: true })
  effectId?: string;

  @Field(() => [PostTag])
  tags: PostTag[];
}

@ObjectType()
export class GetActionsCursorResponse extends CreateGqlCursorPaginatedResponse(
  Action,
) {}
