import { PostLocation } from '@entities';
import {
  ObjectType,
  Field,
  Int,
  ID,
  Directive,
  registerEnumType,
} from '@nestjs/graphql';
import { CommentsVisibility, PostVisibility } from 'prismaClient';

registerEnumType(CommentsVisibility, { name: 'CommentsVisibility' });
registerEnumType(PostVisibility, { name: 'PostVisibility' });

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Service {
  @Field(() => ID)
  @Directive('@external')
  id: string;
}

@ObjectType()
export class ServicePost {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  serviceId: string;

  @Field(() => Service)
  service: Service;

  @Field(() => ID)
  userId: string;

  @Field(() => Int)
  reactionNum: number;

  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  shares: number;

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => PostLocation)
  location: PostLocation;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;
}
