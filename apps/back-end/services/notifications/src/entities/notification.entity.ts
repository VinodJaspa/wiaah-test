import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { CreateGqlPaginatedResponse } from 'nest-utils';
import { NotifiactionType } from 'prismaClient';

registerEnumType(NotifiactionType, { name: 'NotificationType' });

@ObjectType()
export class NotificationAuthor {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  thumbnail: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => NotifiactionType)
  type: NotifiactionType;

  @Field(() => NotificationAuthor)
  author: NotificationAuthor;

  @Field(() => ID)
  authorProfileId: string;

  @Field(() => String)
  content: string;
}

@ObjectType()
export class NotifactionsPaginationResponse extends CreateGqlPaginatedResponse(
  Notification,
) {}
