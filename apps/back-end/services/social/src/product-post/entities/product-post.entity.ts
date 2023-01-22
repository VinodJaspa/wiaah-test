import { Account, PostLocation } from '@entities';
import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';
import { CommentsVisibility, PostVisibility } from 'prismaClient';
import { Product } from './extends';

registerEnumType(PostVisibility, { name: 'PostVisibility' });

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

  @Field(() => Int)
  views: number;

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => PostLocation, { nullable: true })
  location?: PostLocation;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;

  @Field(() => Product)
  product?: Product;
}
