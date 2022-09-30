import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotificationSettingsService } from './notification-settings.service';
import { UserNotificationSettings } from '@entities';
import {
  DisableNotificationFromContentInput,
  UpdateNotificationSettingInput,
} from '@input';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';

@Resolver(() => UserNotificationSettings)
export class NotificationSettingsResolver {
  constructor(
    private readonly notificationSettingsService: NotificationSettingsService,
  ) {}

  @Mutation(() => UserNotificationSettings)
  updateMyNotification(
    @Args() input: UpdateNotificationSettingInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.notificationSettingsService.updateUserNotificationSettings(
      input,
      user.id,
    );
  }

  @Mutation(() => UserNotificationSettings)
  disableNotificationFromContent(
    input: DisableNotificationFromContentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.notificationSettingsService.disableNotificationOfContent(
      input,
      user.id,
    );
  }
}
