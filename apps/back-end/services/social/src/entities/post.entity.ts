import {
  ObjectType,
  Field,
  Int,
  ID,
  InputType,
  Directive,
} from '@nestjs/graphql';
import { Profile } from '@entities';
import { Attachment, Hashtag } from '@entities';

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
@Directive('@key(fields: "id")')
export class NewsfeedPost {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Profile, { nullable: true })
  publisher?: Profile;

  @Field(() => ID)
  authorProfileId: string;

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

  @Field(() => [PostMention])
  mentions: PostMention[];

  @Field(() => PostLocation, { nullable: true })
  location?: PostLocation;
}
