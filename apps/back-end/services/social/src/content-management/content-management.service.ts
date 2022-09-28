import { Attachment, Comment, NewsfeedPost } from '@entities';
import {
  ContentNotFoundException,
  PostAttachmentTypeException,
  PostMaximumAttachmentException,
  PostMinimumAttachmentsException,
} from '@exceptions';
import { Injectable } from '@nestjs/common';
import { ContentHostType } from 'prismaClient';
import { PrismaService } from 'prismaService';

type ContentData = Comment | NewsfeedPost;

@Injectable()
export class ContentManagementService {
  constructor(private readonly prisma: PrismaService) {}
  async validatePostAttachments(attachments: Attachment[]): Promise<boolean> {
    if (attachments.length < 1) throw new PostMinimumAttachmentsException(1);
    if (attachments.length > 10) throw new PostMaximumAttachmentException(10);

    const hasVideo = attachments.some((att) => att.type === 'vid');

    if (hasVideo && attachments.length > 1)
      throw new PostAttachmentTypeException();

    const isImages = attachments.every((att) => att.type === 'img');

    return isImages;
  }

  async incrementContentReactions(
    type: ContentHostType,
    contentId: string,
  ): Promise<ContentData> {
    switch (type) {
      case 'post_newsfeed':
        return this.prisma.newsfeedPost.update({
          where: {
            id: contentId,
          },
          data: {
            reactionNum: {
              increment: 1,
            },
          },
        });
      case 'comment':
        return this.prisma.comment.update({
          where: {
            id: contentId,
          },
          data: {
            likes: {
              increment: 1,
            },
          },
        });

      default:
        throw new ContentNotFoundException();
    }
  }

  async incrementContentComments(
    type: ContentHostType,
    contentId: string,
  ): Promise<ContentData> {
    switch (type) {
      case 'post_newsfeed':
        return this.prisma.newsfeedPost.update({
          where: {
            id: contentId,
          },
          data: {
            comments: {
              increment: 1,
            },
          },
        });
      case 'comment':
        return this.prisma.comment.update({
          where: {
            id: contentId,
          },
          data: {
            replies: {
              increment: 1,
            },
          },
        });

      default:
        throw new ContentNotFoundException();
    }
  }

  async incrementContentShares(
    type: ContentHostType,
    contentId: string,
  ): Promise<ContentData> {
    switch (type) {
      case 'post_newsfeed':
        return this.prisma.newsfeedPost.update({
          where: {
            id: contentId,
          },
          data: {
            shares: {
              increment: 1,
            },
          },
        });

      default:
        throw new ContentNotFoundException();
    }
  }

  async decrementContentReactions(
    type: ContentHostType,
    contentId: string,
  ): Promise<ContentData> {
    switch (type) {
      case 'post_newsfeed':
        return this.prisma.newsfeedPost.update({
          where: {
            id: contentId,
          },
          data: {
            reactionNum: {
              decrement: 1,
            },
          },
        });
      case 'comment':
        return this.prisma.comment.update({
          where: {
            id: contentId,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });

      default:
        throw new ContentNotFoundException();
    }
  }

  async decrementContentComments(
    type: ContentHostType,
    contentId: string,
  ): Promise<ContentData> {
    switch (type) {
      case 'post_newsfeed':
        return this.prisma.newsfeedPost.update({
          where: {
            id: contentId,
          },
          data: {
            comments: {
              decrement: 1,
            },
          },
        });
      case 'comment':
        return this.prisma.comment.update({
          where: {
            id: contentId,
          },
          data: {
            replies: {
              decrement: 1,
            },
          },
        });

      default:
        throw new ContentNotFoundException();
    }
  }

  async decrementContentShares(
    type: ContentHostType,
    contentId: string,
  ): Promise<ContentData> {
    switch (type) {
      case 'post_newsfeed':
        return this.prisma.newsfeedPost.update({
          where: {
            id: contentId,
          },
          data: {
            shares: {
              decrement: 1,
            },
          },
        });

      default:
        throw new ContentNotFoundException();
    }
  }
}
