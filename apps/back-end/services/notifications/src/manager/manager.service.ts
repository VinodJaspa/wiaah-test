import { NotifactionsPaginationResponse, NotificationAuthor } from '@entities';
import { Injectable } from '@nestjs/common';
import { NotifiactionType } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class MangerService {
  constructor(private readonly prisma: PrismaService) {}

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
  }) {
    const { content, type, author, userId, authorProfileId } = props;
    await this.prisma.notification.create({
      data: {
        author,
        content,
        type,
        userId,
        authorProfileId,
      },
    });
  }
}
