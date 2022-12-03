import { NotificationPaginationResponse } from '@entities';
import { Injectable } from '@nestjs/common';
import { NotificationSettingsService } from '@notification-settings';
import { DBErrorException } from 'nest-utils';
import { NotifiactionType } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class ManagerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationSettings: NotificationSettingsService,
  ) {}

  async getMyNotifications(
    userId: string,
  ): Promise<NotificationPaginationResponse> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
      },
    });

    return {
      data: notifications,
      hasMore: false,
      total: notifications.length,
    };
  }

  async createNotification(props: {
    contentOwnerUserId?: string;
    type: NotifiactionType;
    content: string;
    authorProfileId?: string;
    authorId: string;
    contentId?: string;
    isFollowed?: boolean;
  }) {
    const {
      content,
      type,
      authorId,
      contentOwnerUserId,
      authorProfileId,
      contentId,
      isFollowed,
    } = props;

    if (contentId) {
      const canSend = await this.canSendNotification(
        contentId,
        authorId,
        type,
        !!isFollowed,
      );
      console.log('cannot send', canSend);
      if (!canSend) return;
    }

    try {
      await this.prisma.notification.create({
        data: {
          content,
          type,
          userId: contentOwnerUserId,
          authorProfileId,
          contentId,
          authorId,
        },
      });
    } catch (error) {
      console.log(error);
      throw new DBErrorException('failed to create notification');
    }
  }

  async canSendNotification(
    contentId: string,
    reciverUserId: string,
    contentType: NotifiactionType,
    isFollowed: boolean,
  ): Promise<boolean> {
    const conditions: boolean[] = [];
    const isDisabled = await this.notificationSettings.isDisabled(
      contentId,
      reciverUserId,
    );
    if (isDisabled) conditions.push(false);

    const notificationAllowed =
      await this.notificationSettings.isNoficiationTypeAllowed(
        contentType,
        reciverUserId,
        isFollowed,
      );
    if (!notificationAllowed) conditions.push(false);
    console.log({ isDisabled, notificationAllowed });
    return conditions.every((c) => c);
  }
}
