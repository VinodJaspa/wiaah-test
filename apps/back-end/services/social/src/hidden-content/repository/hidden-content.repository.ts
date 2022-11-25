import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class HiddenContentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(contentId: string, userId: string) {
    return this.prisma.hiddenContent.create({
      data: {
        contentId,
        userId,
      },
    });
  }

  getOne(contentId: string, userId: string) {
    return this.prisma.hiddenContent.findUnique({
      where: {
        contentId_userId: {
          contentId,
          userId,
        },
      },
    });
  }

  getManyByUserId(userId: string) {
    return this.prisma.hiddenContent.findMany({
      where: {
        userId,
      },
    });
  }
}
