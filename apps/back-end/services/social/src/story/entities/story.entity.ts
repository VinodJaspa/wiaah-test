import { Attachment, PostTag } from '@entities';
import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { StoryType } from 'prismaClient';

import {
  AffiliationPost,
  NewsfeedPost,
  Product,
  ServicePost,
  ShopPost,
} from './extends';
import { StoryView } from './story-view.entity';

registerEnumType(StoryType, { name: 'StoryType' });

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

  @Field(() => StoryType)
  type: StoryType;

  @Field(() => Int)
  viewsCount: number;

  @Field(() => Int)
  reactionsNum: number;

  @Field(() => ID, { nullable: true })
  referenceId?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Attachment, { nullable: true })
  attachements?: Attachment;

  @Field(() => [StoryView])
  views?: StoryView[];

  @Field(() => NewsfeedPost, { nullable: true })
  newsfeedPost?: NewsfeedPost;

  @Field(() => ShopPost, { nullable: true })
  shopPost?: ShopPost;

  @Field(() => AffiliationPost, { nullable: true })
  affiliationPost?: AffiliationPost;

  @Field(() => ServicePost, { nullable: true })
  servicePost?: ServicePost;
}
