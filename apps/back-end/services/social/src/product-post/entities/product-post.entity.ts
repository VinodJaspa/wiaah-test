import { Attachment, Hashtag, PostLocation, PostMention } from '@entities';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { CommentsVisibility, PostVisibility } from 'prismaClient';

@ObjectType()
export class ProductPost {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  productId: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [Attachment])
  attachments: Attachment[];

  @Field(() => [Hashtag])
  tags: Hashtag[];

  @Field(() => Int)
  reactionNum: number;

  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  shares: number;

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => PostLocation, { nullable: true })
  location: PostLocation;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;

  @Field(() => [PostMention])
  mentions: PostMention[];
}
