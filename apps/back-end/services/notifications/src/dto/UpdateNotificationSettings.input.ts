import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { NotificationSettingsEnum } from 'prismaClient';

@InputType()
export class UpdateNotificationSettingInput {
  @Field(() => NotificationSettingsEnum, { nullable: true })
  postReaction?: NotificationSettingsEnum;
  @Field(() => NotificationSettingsEnum, { nullable: true })
  postComment?: NotificationSettingsEnum;
  @Field(() => NotificationSettingsEnum, { nullable: true })
  commentLike?: NotificationSettingsEnum;
  @Field(() => NotificationSettingsEnum, { nullable: true })
  mentions?: NotificationSettingsEnum;
}
