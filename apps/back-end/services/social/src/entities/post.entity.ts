import {
  ObjectType,
  Field,
  Int,
  ID,
  registerEnumType,
  Float,
} from '@nestjs/graphql';
import { Profile } from '@entities';
import { Attachment, Hashtag } from '@entities';
import { CommentsVisibility, MarketingTagType } from 'prismaClient';

registerEnumType(CommentsVisibility, { name: 'CommentsVisiblity' });

@ObjectType()
export class PostTag {
  @Field(() => ID)
  userId: string;
}

@ObjectType()
export class MarketingTag {
  @Field(() => ID)
  id: string;

  @Field(() => MarketingTagType)
  type: MarketingTagType;

  @Field(() => Float)
  x: number;

  @Field(() => Float)
  y: number;
}

@ObjectType()
export class PostMention {
  @Field(() => ID)
  userId: string;
}

@ObjectType()
export class PostLocation {
  @Field(() => String)
  city: string;

  @Field(() => String)
  country: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  state: string;
}

@ObjectType()
export class SocialPost {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => [Attachment])
  attachments: Attachment[];

  @Field(() => [Hashtag])
  hashtags: Hashtag[];

  @Field(() => Int)
  reactionNum: number;

  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  shares: number;

  @Field(() => Int)
  views: number;

  @Field(() => [PostMention])
  mentions: PostMention[];

  @Field(() => PostLocation, { nullable: true })
  location?: PostLocation;

  @Field(() => [PostTag])
  tags: PostTag[];

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

@ObjectType()
export class NewsfeedPost extends SocialPost {
  @Field(() => Profile, { nullable: true })
  publisher?: Profile;

  @Field(() => ID)
  authorProfileId: string;
}
