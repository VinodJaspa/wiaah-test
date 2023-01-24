import { Account, PostLocation, SocialPost } from '@entities';
import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { CommentsVisibility, PostVisibility } from 'prismaClient';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Affiliation {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
export class AffiliationPost {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Account, { nullable: true })
  user?: Account;

  @Field(() => ID)
  affiliationId: string;

  @Field(() => Int)
  reactionNum: number;

  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  shares: number;

  @Field(() => Int)
  views: number;

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => PostLocation, { nullable: true })
  location?: PostLocation;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;

  @Field(() => Affiliation)
  affiliation?: Affiliation;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
