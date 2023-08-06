import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateNewsfeedPostInput, UpdateNewsfeedPostInput } from '@input';
import { PrismaService } from 'prismaService';
import { NewsfeedPost } from '@entities';
import { ProfileService } from '@profile-service';
import {
  PostCreataionFailedException,
  PostNotFoundException,
  UserCannotViewContentException,
} from '@exceptions';
import {
  DBErrorException,
  ExtractPagination,
  GqlPaginationInput,
  NotOwnerOfResourcePublicError,
} from 'nest-utils';
import { ContentManagementService } from '@content-management';
import { EventBus } from '@nestjs/cqrs';
import { PostCreatedEvent } from './events';
import { PostStatus, PostType } from 'prismaClient';

@Injectable()
export class NewsfeedPostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
    private readonly contentManagementService: ContentManagementService,
    private readonly eventbus: EventBus,
  ) {}
  logger = new Logger('NewfeedPostsService');

  async getNewsfeedPostById(postId: string): Promise<NewsfeedPost> {
    const post = await this.prisma.newsfeedPost.findUnique({
      where: {
        id: postId,
      },
      rejectOnNotFound(error) {
        console.log(error);
        throw new PostNotFoundException();
      },
    });
    const { visibility } = post;
    if (visibility === 'hidden') {
      return { ...post, comments: 0, reactionNum: 0 };
    }
    return post;
  }

  async getProtectedNewsfeedPostById(
    postId: string,
    userId: string,
    inclueUser?: boolean,
  ): Promise<NewsfeedPost> {
    const post = await this.prisma.newsfeedPost.findUnique({
      where: {
        id: postId,
      },
      include: {
        publisher: inclueUser,
      },
      rejectOnNotFound() {
        throw new PostNotFoundException();
      },
    });
    const canView = await this.profileService.canViewContentByUserId(
      post.userId,
      userId,
    );

    if (!canView) throw new UserCannotViewContentException();

    return post;
  }

  getNewsfeedPostsById(ids: string[]): Promise<NewsfeedPost[]> {
    return this.prisma.newsfeedPost.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async getNewsfeedPostsByUserId(
    userId: string,
    type: PostType,
    pagination: GqlPaginationInput,
    sortPinned?: boolean,
  ) {
    const { skip, take } = ExtractPagination(pagination);

    const pinned = await this.prisma.pinnedContent.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const pinnedPosts = await this.prisma.newsfeedPost.findMany({
      where: {
        id: {
          in: pinned.map((v) => v.contentId),
        },
        type,
      },
    });

    const posts = await this.prisma.newsfeedPost.findMany({
      where: {
        userId,
        type,
        id: {
          not: {
            in: pinnedPosts.map((v) => v.id),
          },
        },
      },
      take,
      skip,
    });

    const sortedPinnedPosts = pinned
      .map((v) => pinnedPosts.find((post) => post.id === v.contentId))
      .filter((v) => !!v);

    return sortedPinnedPosts.concat(posts);
  }

  async getProtectedNewsfeedPostsByUserId(
    userId: string,
    pagination: GqlPaginationInput,
  ) {
    const { skip, take } = ExtractPagination(pagination);
    return this.prisma.newsfeedPost.findMany({
      where: {
        userId,
        status: PostStatus.active,
      },
      take,
      skip,
    });
  }

  async createNewsfeedPost(
    input: CreateNewsfeedPostInput,
    userId: string,
  ): Promise<NewsfeedPost> {
    const profileId = await this.profileService.getProfileIdByUserId(userId);

    try {
      const res = await this.prisma.newsfeedPost.create({
        data: {
          ...input,
          authorProfileId: profileId,
          userId,
          legend: [
            input.content,
            input.title,
            input.hashtags.map((v) => v.tag).join(' '),
          ].join(' '),
        },
      });

      this.eventbus.publish(new PostCreatedEvent(res, userId));
      return res;
    } catch (error) {
      this.logger.error(error);
      throw new PostCreataionFailedException();
    }
  }

  findAll() {
    return this.prisma.newsfeedPost.findMany();
  }

  async update(
    input: UpdateNewsfeedPostInput,
    userId: string,
  ): Promise<NewsfeedPost> {
    const { id, ...rest } = input;
    const [isAuthor, post] = await this.isAuthorOfPost(id, userId);
    if (!isAuthor)
      throw new NotOwnerOfResourcePublicError(
        'you can only update posts you have published',
      );
    try {
      return await this.prisma.newsfeedPost.update({
        where: {
          id,
        },
        data: {
          ...rest,
          legend: [
            input.content || post.content,
            input.title || post.title,
            (input.hashtags || post.hashtags).map((v) => v.tag).join(' '),
          ].join(' '),
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException('Failed to update post');
    }
  }

  async isAuthorOfPost(
    postId: string,
    userId: string,
  ): Promise<[boolean, NewsfeedPost]> {
    try {
      const post = await this.prisma.newsfeedPost.findUnique({
        where: {
          id: postId,
        },

        rejectOnNotFound() {
          throw new PostNotFoundException();
        },
      });

      return [post.userId === userId, post];
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteNewsfeedPost(
    postId: string,
    userId: string,
  ): Promise<NewsfeedPost> {
    const isAuthor = await this.isAuthorOfPost(postId, userId);
    if (!isAuthor)
      throw new NotOwnerOfResourcePublicError(
        'you can only delete posts you have published',
      );
    try {
      return await this.prisma.newsfeedPost.delete({
        where: {
          id: postId,
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getPostAuthorProfileIdByPostId(postId: string): Promise<string> {
    const { authorProfileId } = await this.prisma.newsfeedPost.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorProfileId: true,
      },
      rejectOnNotFound() {
        throw new PostNotFoundException();
      },
    });
    return authorProfileId;
  }
}
