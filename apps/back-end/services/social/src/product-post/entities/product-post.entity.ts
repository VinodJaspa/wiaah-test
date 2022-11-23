import { Account, PostLocation, SocialPost } from '@entities';
import { ObjectType, Field, ID, Directive, Int } from '@nestjs/graphql';
import { CommentsVisibility, PostVisibility } from 'prismaClient';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Product {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
export class ProductPost {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Account, { nullable: true })
  user?: Account;

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  reactionNum: number;

  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  shares: number;

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => PostLocation, { nullable: true })
  location?: PostLocation;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;

  @Field(() => Product)
  product?: Product;
}
