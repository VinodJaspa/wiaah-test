import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class UserActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOne(id: string) {
    return this.prisma.userActivityStats.findUnique({
      where: {
        id,
      },
    });
  }

  updateUserLastActive(userId: string, date: Date) {
    return this.prisma.userActivityStats.update({
      where: {
        id: userId,
      },
      data: {
        lastActive: date,
      },
    });
  }

  updateUserScore(input: { userId: string; score: number; increase: boolean }) {
    const { increase, score, userId } = input;

    return this.prisma.userActivityStats.update({
      where: {
        id: userId,
      },
      data: {
        activityScore: increase
          ? {
              increment: score,
            }
          : {
              decrement: score,
            },
      },
    });
  }

  updateUserActiveMins(userId: string, mins: number) {
    return this.prisma.userActivityStats.update({
      where: {
        id: userId,
      },
      data: {
        lastActive: new Date(),
        day_active_min: {
          increment: mins,
        },
      },
    });
  }
}
