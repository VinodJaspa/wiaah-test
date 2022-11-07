import { Attachment } from '@entities';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

import {
  AffiliationPost,
  NewsfeedPost,
  Product,
  ServicePost,
  ShopPost,
} from './extends';
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

  @Field(() => String)
  type: string;

  @Field(() => Int)
  viewsCount: number;

  @Field(() => Int)
  reactionsNum: number;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Attachment, { nullable: true })
  attachements?: Attachment;

  @Field(() => [StoryView], { nullable: true })
  views?: StoryView[];

  @Field(() => ID, { nullable: true })
  productId?: string;

  @Field(() => ID, { nullable: true })
  newsfeedPostId?: string;

  @Field(() => ID, { nullable: true })
  shopPostId?: string;

  @Field(() => ID, { nullable: true })
  affiliationPostId?: string;

  @Field(() => ID, { nullable: true })
  servicePostId?: string;

  @Field(() => NewsfeedPost, { nullable: true })
  newsfeedPost?: NewsfeedPost;

  @Field(() => ShopPost, { nullable: true })
  shopPost?: ShopPost;

  @Field(() => AffiliationPost, { nullable: true })
  affiliationPost?: AffiliationPost;

  @Field(() => Product, { nullable: true })
  product?: Product;

  @Field(() => ServicePost, { nullable: true })
  servicePost?: ServicePost;
}
