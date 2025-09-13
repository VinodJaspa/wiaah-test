import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationSettingsService } from './notification-settings.service';
import { UserNotificationSettings } from '@entities';
import {
  DisableNotificationFromContentInput,
  UpdateNotificationSettingInput,
} from '@input';
import {
  AuthorizationDecodedUser,
  GqlCurrentUser,
  accountType,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { UnauthorizedException } from '@nestjs/common';


@Resolver(() => UserNotificationSettings)
export class NotificationSettingsResolver {
  constructor(
    private readonly notificationSettingsService: NotificationSettingsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => UserNotificationSettings)
  async getUserNotificationsSettings(
    @Args('userId') userId: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    console.log(userId , user ,"okkkkk");
    
    // await this.validateReadPremission(userId, user);
    return this.notificationSettingsService.getOneByUserId(
      userId,
  
     );
  }

  @Mutation(() => UserNotificationSettings)
  updateMyNotification(
    @Args('updateNotificationsArgs') input: UpdateNotificationSettingInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.notificationSettingsService.updateUserNotificationSettings(
      input,
      user.id,
    );
  }
@Mutation(() => UserNotificationSettings)
disableNotificationFromContent(
  @Args('input') input: DisableNotificationFromContentInput,
  @GqlCurrentUser() user: AuthorizationDecodedUser,
) {
  return this.notificationSettingsService.disableNotificationOfContent(
    input,
    user.id,
  );
}


  async validateReadPremission(userId: string, user: AuthorizationDecodedUser) {
    if (userId !== user.id && user.accountType !== accountType.ADMIN)
      throw new UnauthorizedException();
  }
}
