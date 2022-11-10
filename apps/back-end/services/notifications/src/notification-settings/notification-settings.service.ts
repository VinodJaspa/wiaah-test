import { SilentContent, UserNotificationSettings } from '@entities';
import { UpdateNotificationSettingInput } from '@input';
import { Injectable } from '@nestjs/common';
import { DBErrorException } from 'nest-utils';
import { NotifiactionType, NotificationSettingsEnum } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { DisableNotificationFromContentInput } from '../dto';
import { ContentNotificationAlreadyDisabledException } from '../exceptions';

@Injectable()
export class NotificationSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccountNotifciationSettings(
    userId: string,
  ): Promise<UserNotificationSettings> {
    return {
      ...(await this.prisma.userNotificationSettings.create({
        data: {
          userId,
        },
      })),
      silentedContent: [],
    };
  }

  async updateUserNotificationSettings(
    input: UpdateNotificationSettingInput,
    userId: string,
  ): Promise<boolean> {
    try {
      await this.prisma.userNotificationSettings.update({
        where: {
          userId,
        },
        data: input,
      });

      return true;
    } catch (error) {}
  }

  async disableNotificationOfContent(
    input: DisableNotificationFromContentInput,
    userId: string,
  ): Promise<SilentContent> {
    const isDisabled = await this.isDisabled(input.contentId, userId);
    if (isDisabled) throw new ContentNotificationAlreadyDisabledException();

    try {
      const content = await this.prisma.silentContent.create({
        data: {
          userId,
          contentId: input.contentId,
        },
      });

      return content;
    } catch (error) {
      throw new DBErrorException('error disabling this content');
    }
  }

  async isDisabled(contentId: string, userId: string): Promise<boolean> {
    try {
      await this.prisma.silentContent.findFirst({
        where: {
          AND: [
            {
              contentId: contentId,
            },
            {
              userId,
            },
          ],
        },
        rejectOnNotFound(error) {
          throw error;
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async isNoficiationTypeAllowed(
    notificationType: NotifiactionType,
    userId: string,
    isFollowed: boolean,
  ): Promise<boolean> {
    const userSettings =
      (await this.prisma.userNotificationSettings.findUnique({
        where: {
          userId,
        },
      })) ?? (await this.createAccountNotifciationSettings(userId));

    let rule: NotificationSettingsEnum;
    switch (notificationType) {
      case 'postCommented':
        rule = userSettings.postComment;
        return this.checkNotificationRule(rule, isFollowed);

      case 'postReacted':
        rule = userSettings.postReaction;
        return this.checkNotificationRule(rule, isFollowed);

      case 'commentReacted':
        rule = userSettings.commentLike;
        return this.checkNotificationRule(rule, isFollowed);

      default:
        return true;
    }
  }

  checkNotificationRule(
    rule: NotificationSettingsEnum,
    isFollowed: boolean,
  ): boolean {
    switch (rule) {
      case 'on':
        return true;

      case 'off':
        return false;

      case 'iFollow':
        return isFollowed;

      default:
        return false;
    }
  }
}
