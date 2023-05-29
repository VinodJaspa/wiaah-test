import { ContentDiscoveryService } from '@content-discovery';
import { UserSavedPostsGroup } from '@entities';
import { Injectable } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  ExtractPagination,
  KnownError,
  NoReadPremissionPublicError,
  NotOwnerOfResourcePublicError,
  PublicErrorCodes,
  accountType,
} from 'nest-utils';
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

  async savePost(postId: string, collectionId: string, requestUserId: string) {
    const collection = await this.prisma.savesCollection.findUnique({
      where: {
        id: collectionId,
      },
    });

    if (!collection)
      throw new KnownError(
        'save collection was not found',
        PublicErrorCodes.resourceNotFound,
      );

    if (collection.userId !== requestUserId)
      throw new NotOwnerOfResourcePublicError();

    const res = await this.prisma.savedPost.create({
      data: {
        postId,
        collectionId,
        userId: collection.userId,
      },
    });

    return !!res;
  }

  async validateReadPremission(userId: string, user: AuthorizationDecodedUser) {
    if (userId !== user.id && user.accountType !== accountType.ADMIN)
      throw new NoReadPremissionPublicError();
  }
}
