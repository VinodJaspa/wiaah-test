import { Account, PostLocation } from '@entities';
import {
  ObjectType,
  Field,
  Int,
  ID,
  Directive,
  registerEnumType,
} from '@nestjs/graphql';
import {
  CommentsVisibility,
  PostVisibility,
  TypeOfService,
} from 'prismaClient';

registerEnumType(CommentsVisibility, { name: 'CommentsVisibility' });
registerEnumType(PostVisibility, { name: 'PostVisibility' });
registerEnumType(TypeOfService, { name: 'TypeOfService' });

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

  @Field(() => Service, { nullable: true })
  service?: Service;

  @Field(() => TypeOfService)
  serviceType: TypeOfService;

  @Field(() => ID)
  userId: string;

  @Field(() => Account, { nullable: true })
  user?: Account;

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

  @Field(() => PostLocation)
  location: PostLocation;

  @Field(() => CommentsVisibility)
  commentsVisibility: CommentsVisibility;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}
