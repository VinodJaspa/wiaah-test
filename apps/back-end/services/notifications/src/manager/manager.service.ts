import { NotifactionsPaginationResponse, NotificationAuthor } from '@entities';
import { Injectable } from '@nestjs/common';
import { NotificationSettingsService } from '@notification-settings';
import { DBErrorException } from 'nest-utils';
import { NotifiactionType } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class MangerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationSettings: NotificationSettingsService,
  ) {}

  async getMyNotifications(
    userId: string,
  ): Promise<NotifactionsPaginationResponse> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
      },
    });

    return {
      data: notifications,
      hasMore: false,
      total: 15,
    };
  }

  async createNotification(props: {
    type: NotifiactionType;
    content: string;
    userId?: string;
    author?: NotificationAuthor;
    authorProfileId?: string;
    contentId?: string;
    isFollowed?: boolean;
  }) {
    const {
      content,
      type,
      author,
      userId,
      authorProfileId,
      contentId,
      isFollowed,
    } = props;

    if (contentId) {
      const canSend = await this.canSendNotification(
        contentId,
        userId,
        type,
        !!isFollowed,
      );

      if (!canSend) return;
    }

    try {
      await this.prisma.notification.create({
        data: {
          author,
          content,
          type,
          userId,
          authorProfileId,
          contentId,
        },
      });
    } catch (error) {
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

    return conditions.every((c) => c);
  }
}
