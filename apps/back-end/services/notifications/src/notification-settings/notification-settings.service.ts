import { UpdateNotificationSettingInput } from '@input';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class NotificationSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccountNotifciationSettings(userId: string) {
    await this.prisma.userNotificationSettings.create({
      data: {
        userId,
      },
    });
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
}
