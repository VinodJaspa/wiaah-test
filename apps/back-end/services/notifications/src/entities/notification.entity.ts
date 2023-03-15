import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { CreateGqlPaginatedResponse } from 'nest-utils';
import { NotificationType } from 'prismaClient';
import { Account } from './extends';

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

  @Field(() => Account, { nullable: true })
  author?: Account;

  @Field(() => ID)
  authorProfileId: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  thumbnail?: string;
}

@ObjectType()
export class NotificationPaginationResponse extends CreateGqlPaginatedResponse(
  Notification,
) {}
