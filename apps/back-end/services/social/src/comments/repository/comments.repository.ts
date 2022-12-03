import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

type Sort = {
  key: string;
  asc: boolean;
};

export enum CommentsSortKeysEnum {
  createdAt = 'createdAt',
  likes = 'likes',
  comments = 'comments',
  mentions = 'mentions',
  replies = 'replies',
}

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllByUserIds(includeIds: string[], excludeIds: string[], filter: Sort) {
    const _includeIds = includeIds.filter((v) => !excludeIds.includes(v));
    return this.prisma.comment.findMany({
      where: {
        AND: [
          {
            userId: {
              in: _includeIds,
            },
          },
          {
            userId: {
              notIn: excludeIds,
            },
          },
        ],
      },
      orderBy: {
        [filter.key]: filter.asc ? 'asc' : 'desc',
      },
    });
  }

  getAllByHostId(hostId: string) {
    return this.prisma.comment.findMany({
      where: {
        hostId,
      },
    });
  }
}
