import { ContentData, ContentDiscoveryService } from '@content-discovery';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class SavedPostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contentDiscoveryService: ContentDiscoveryService,
  ) {}

  async getUserSavedPosts(userId: string): Promise<ContentData[]> {
    const postsGroup = await this.prisma.userSavedPostsGroup.findUnique({
      where: {
        userId,
      },
    });

    const postIds = postsGroup.posts;

    const posts = await this.contentDiscoveryService.getManyPosts(
      postIds.map((p) => ({ contentId: p.postId, type: p.postType })),
    );

    return posts;
  }
}
