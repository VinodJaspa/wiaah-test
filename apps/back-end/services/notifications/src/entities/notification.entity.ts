import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { CreateGqlPaginatedResponse } from 'nest-utils';
import { NotifiactionType } from 'prismaClient';
import { User } from './extends';

registerEnumType(NotifiactionType, { name: 'NotificationType' });

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => NotifiactionType)
  type: NotifiactionType;

  @Field(() => User, { nullable: true })
  author?: User;

  @Field(() => ID)
  authorProfileId: string;

  @Field(() => String)
  content: string;
}

@ObjectType()
export class NotificationPaginationResponse extends CreateGqlPaginatedResponse(
  Notification,
) {}
