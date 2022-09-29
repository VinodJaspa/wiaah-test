import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { NotificationSettingsEnum } from 'prismaClient';

registerEnumType(NotificationSettingsEnum, {
  name: 'NotificationSettingsEnum',
});

@ObjectType()
export class UserNotificationSettings {
  @Field(() => ID)
  id: string;

  @Field(() => NotificationSettingsEnum)
  postReaction: NotificationSettingsEnum;

  @Field(() => NotificationSettingsEnum)
  postComment: NotificationSettingsEnum;

  @Field(() => NotificationSettingsEnum)
  commentLike: NotificationSettingsEnum;

  @Field(() => NotificationSettingsEnum)
  mentions: NotificationSettingsEnum;
}
