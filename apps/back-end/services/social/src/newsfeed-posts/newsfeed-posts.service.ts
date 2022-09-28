import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateNewsfeedPostInput, UpdateNewsfeedPostInput } from '@input';
import { PrismaService } from 'prismaService';
import { NewsfeedPost } from '@entities';
import { ProfileService } from '@profile-service';
import {
  PostCreataionFailedException,
  PostNotFoundException,
} from '@exceptions';
import { DBErrorException } from 'nest-utils';
import { ContentManagementService } from '@content-management';

@Injectable()
export class NewsfeedPostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
    private readonly contentManagementService: ContentManagementService,
  ) {}
  logger = new Logger('NewfeedPostsService');

  getNewsfeedPostById(postId: string): Promise<NewsfeedPost> {
    return this.prisma.newsfeedPost.findUnique({
      where: {
        id: postId,
      },
      rejectOnNotFound(error) {
        this.logger.error(error);
        throw new PostNotFoundException();
      },
    });
  }

  async createNewsfeedPost(
    createNewsfeedPostInput: CreateNewsfeedPostInput,
    userId: string,
  ): Promise<NewsfeedPost> {
    const { attachments, content, tags, title, visibility } =
      createNewsfeedPostInput;

    await this.contentManagementService.validatePostAttachments(attachments);

    const profileId = await this.profileService.getProfileIdByUserId(userId);

    try {
      return await this.prisma.newsfeedPost.create({
        data: {
          content,
          title,
          attachments,
          tags,
          visibility,
          authorProfileId: profileId,
          userId,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new PostCreataionFailedException();
    }
  }

  findAll() {
    return this.prisma.newsfeedPost.findMany();
  }

  async update(
    updateNewsfeedPostInput: UpdateNewsfeedPostInput,
    userId: string,
  ): Promise<NewsfeedPost> {
    const { id, ...rest } = updateNewsfeedPostInput;
    const isAuthor = await this.isAuthorOfPost(id, userId);
    if (!isAuthor)
      throw new UnauthorizedException(
        'you can only update posts you have published',
      );
    try {
      return await this.prisma.newsfeedPost.update({
        where: {
          id,
        },
        data: rest,
      });
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException('Failed to update post');
    }
  }

  async isAuthorOfPost(postId: string, userId: string): Promise<boolean> {
    try {
      const post = await this.prisma.newsfeedPost.findUnique({
        where: {
          id: postId,
        },
        select: {
          userId: true,
        },
        rejectOnNotFound() {
          throw new PostNotFoundException();
        },
      });

      return post.userId === userId;
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
      throw new UnauthorizedException(
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
}
