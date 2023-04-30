import { Attachment, Profile } from '@entities';
import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { ProductPost } from '@product-post/entities';
import { StoryType } from 'prismaClient';

import { AffiliationPost, NewsfeedPost, ServicePost } from './extends';
import { StoryView } from './story-view.entity';
import { CreateGqlCursorPaginatedResponse } from 'nest-utils';

registerEnumType(StoryType, { name: 'StoryType' });

@ObjectType()
export class Story {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  publisherId: string;

  @Field(() => Profile, { nullable: true })
  publisher?: Profile;

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

  @Field(() => ProductPost, { nullable: true })
  shopPost?: ProductPost;

  @Field(() => AffiliationPost, { nullable: true })
  affiliationPost?: AffiliationPost;

  @Field(() => ServicePost, { nullable: true })
  servicePost?: ServicePost;
}

@ObjectType()
export class StoryCursorPaginationResponse {
  @Field(() => Story)
  // and here the generic type
  data: Story;

  @Field(() => String)
  cursor: string;

  @Field(() => String)
  nextCursor: string;

  @Field()
  hasMore: boolean;
}
