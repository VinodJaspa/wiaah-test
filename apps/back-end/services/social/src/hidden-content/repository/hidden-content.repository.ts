import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class HiddenContentRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(contentId: string, userId: string) {
    return this.prisma.hiddenContent.create({
      data: {
        id: contentId,
        userId,
      },
    });
  }

  getOne(contentId: string) {
    return this.prisma.hiddenContent.findUnique({
      where: {
        id: contentId,
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
