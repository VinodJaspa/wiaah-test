import {
  ObjectType,
  Field,
  Int,
  ID,
  registerEnumType,
  Float,
  Directive,
} from '@nestjs/graphql';
import { Profile } from '@entities';
import { Hashtag } from '@entities';
import {
  CommentsVisibility,
  MarketingTagType,
  PostType,
  PostVisibility,
} from 'prismaClient';

registerEnumType(CommentsVisibility, { name: 'CommentsVisiblity' });
// registerEnumType(PostType, { name: 'CommentsVisiblity' });

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

  @Field(() => [String])
  attachments: string[];

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

  @Field(() => Boolean)
  enableComments: boolean;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;

  @Field(() => String, { nullable: true })
  productId?: string;

  @Field(() => String, { nullable: true })
  serviceId?: string;

  @Field(() => String, { nullable: true })
  affiliationId?: string;

  @Field(() => PostType, { defaultValue: PostType.newsfeed_post })
  type: PostType;
}

@ObjectType()
@Directive('@key(fields:"id")')
export class NewsfeedPost extends SocialPost {
  @Field(() => Profile, { nullable: true })
  publisher?: Profile;

  @Field(() => ID)
  authorProfileId: string;
}

@ObjectType()
export class AdminNewsfeedPost extends NewsfeedPost {
  @Field(() => PostVisibility)
  visibility: PostVisibility;
}
