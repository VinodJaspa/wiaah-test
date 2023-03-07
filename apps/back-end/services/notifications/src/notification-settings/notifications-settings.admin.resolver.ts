import { UserNotificationSettings } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Resolver()
export class NotificationsSettingsAdminResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => UserNotificationSettings)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetUserNotificationSettings(@Args('id') accountId: string) {
    return this.prisma.userNotificationSettings.findUnique({
      where: { userId: accountId },
    });
  }
}
