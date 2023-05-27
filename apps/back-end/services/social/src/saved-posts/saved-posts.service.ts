import { ContentDiscoveryService } from '@content-discovery';
import { UserSavedPostsGroup } from '@entities';
import { Injectable } from '@nestjs/common';
import { ExtractPagination } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { GetMySavedPostsInput } from './dto';

@Injectable()
export class SavedPostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contentDiscoveryService: ContentDiscoveryService,
  ) {}

  async getUserSavedPosts(
    input: GetMySavedPostsInput,
    userId: string,
  ): Promise<UserSavedPostsGroup> {
    const { skip, take } = ExtractPagination(input.pagination);
    const postsGroup = await this.prisma.userSavedPostsGroup.findUnique({
      where: {
        userId,
      },
    });

    const postIds = postsGroup.posts;

    const posts = await this.contentDiscoveryService.getManyPosts(
      postIds.map((p) => ({ contentId: p.postId, type: p.postType })),
    );

    return {
      id: postsGroup.id,
      posts,
      userId,
    };
  }

  async savePost(postId: string, userId: string) {
    const res = await this.prisma.savedPost.create({
      data: {
        postId,
        userId,
      },
    });

    return !!res;
  }
}
