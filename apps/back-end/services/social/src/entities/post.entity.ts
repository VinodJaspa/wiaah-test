import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Profile } from '@entities';
import { Attachment, Hashtag } from '@entities';

@ObjectType()
export class NewsfeedPost {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Profile, { nullable: true })
  publisher?: Profile;

  @Field(() => ID)
  profileId: string;

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
}
