import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotificationSettingsService } from './notification-settings.service';
import { UserNotificationSettings } from '@entities';
import { UpdateNotificationSettingInput } from '@input';

@Resolver(() => UserNotificationSettings)
export class NotificationSettingsResolver {
  constructor(
    private readonly notificationSettingsService: NotificationSettingsService,
  ) {}

  @Mutation(() => UserNotificationSettings)
  updateMyNotification(@Args() input: UpdateNotificationSettingInput) {}
}
