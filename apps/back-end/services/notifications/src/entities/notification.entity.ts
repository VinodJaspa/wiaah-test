import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { CreateGqlPaginatedResponse } from 'nest-utils';
import { NotificationType } from 'prismaClient';
import { User } from './extends';

registerEnumType(NotificationType, { name: 'NotificationType' });

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

  @Field(() => NotificationType)
  type: NotificationType;

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
