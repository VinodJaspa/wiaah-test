import { Injectable } from '@nestjs/common';
import { PostStatus } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class NewsfeedPostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  updateOneStatus(id: string, status: PostStatus) {
    return this.prisma.newsfeedPost.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
