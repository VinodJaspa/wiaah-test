import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserNotificationSettings } from './UserNotificationSettings.entity';

@ObjectType()
export class SilentContent {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  contentId: string;

  @Field(() => UserNotificationSettings, { nullable: true })
  silentedBy?: UserNotificationSettings;

  @Field(() => ID)
  userId: string;
}
