import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentInput, GetCommentsOfContent } from '@input';
import { UpdateCommentInput } from '@input';
import { PrismaService } from 'prismaService';
import { ProfileService } from '@profile-service';
import { Comment, PaginationCommentsResponse } from '@entities';
import {
  CannotCommentOnContentException,
  CommentNotFoundException,
} from '@exceptions';
import {
  DBErrorException,
  ExtractPagination,
  KAFKA_EVENTS,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { ContentHostType } from 'prismaClient';
import {
  CommentCreatedEvent,
  CommentDeletedEvent,
  CommentMentionedEvent,
} from 'nest-dto';
import { CommentsPublicStatus } from '@keys';
import { ContentManagementService } from '@content-management';
import { QueryBus } from '@nestjs/cqrs';
import { GetCommentHostDataQuery, GetCommentHostDataQueryRes } from './queries';
import { ContentData, ContentDiscoveryService } from '@content-discovery';
import { GetContentDataQuery } from '@content-discovery/queries';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileSerivce: ProfileService,
    private readonly contentManagementService: ContentManagementService,
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly querybus: QueryBus,
  ) {}

  logger = new Logger('CommentsService');

  getCommentById(commentId: string): Promise<Omit<Comment, 'author'>> {
    return this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
  }

  async createComment(
    createCommentInput: CreateCommentInput,
    userId: string,
  ): Promise<Comment> {
    const { content, contentId, contentType, mentions, attachment } =
      createCommentInput;
    const authorProfileId = await this.profileSerivce.getProfileIdByUserId(
      userId,
    );

    const canComment = await this.canCommentOnContentByUserId(
      contentType,
      contentId,
      authorProfileId,
      userId,
    );

    if (!canComment) {
      throw new CannotCommentOnContentException({});
    }

    const Content = await this.querybus.execute<
      GetContentDataQuery,
      ContentData
    >(new GetContentDataQuery(contentId, contentType));
    try {
      const comment = await this.prisma.comment.create({
        data: {
          hostProfileid: authorProfileId,
          hostUserId: Content.userId,
          content,
          hostId: contentId,
          hostType: contentType,
          attachment,
          mentions,
          authorProfileId,
          userId,
        },
        include: {
          author: true,
        },
      });

      await this.contentManagementService.incrementContentComments(
        contentType,
        contentId,
      );

      this.eventClient.emit(
        KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated(contentType),
        new CommentCreatedEvent({
          hostAuthorId: comment.hostId,
          mainHostAuthorId: comment.userId,
          commentedAt: new Date().toUTCString(),
          commentedByProfileId: authorProfileId,
          commentId: comment.id,
          commentedByUserId: userId,
          hostId: comment.id,
          hostType: 'comment',
          mainHostId: comment.hostId,
          contentOwnerUserId: authorProfileId,
        }),
      );

      this.eventClient.emit(
        KAFKA_EVENTS.COMMENTS_EVENTS.commentMentions,
        new CommentMentionedEvent({
          commentId: comment.id,
          mentionedAt: new Date().toUTCString(),
          mentionedByProfileId: authorProfileId,
          mentionedByUserId: userId,
          mainHostId: comment.hostId,
          mentionedIds: mentions,
        }),
      );

      return comment;
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException('Error creating comment');
    }
  }

  findAll(): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      include: {
        author: true,
      },
    });
  }

  async updateComment(
    updateCommentInput: UpdateCommentInput,
    userId: string,
  ): Promise<Omit<Comment, 'author'>> {
    const { content, id, mentions } = updateCommentInput;
    const isAuthor = await this.isAuthorOfCommentByUserId(id, userId);
    if (!isAuthor) throw new UnauthorizedException();

    try {
      const comment = await this.prisma.comment.update({
        where: {
          id,
        },
        data: {
          content,
          mentions,
        },
      });

      return comment;
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException('failed to update comment');
    }
  }

  async deleteComment(commentId: string, userId: string): Promise<Comment> {
    const comment = await this.getCommentById(commentId);
    if (!comment) throw new NotFoundException();

    const contentAuthor = await this.querybus.execute<
      GetCommentHostDataQuery,
      GetCommentHostDataQueryRes
    >(new GetCommentHostDataQuery(comment.hostId, comment.hostType));

    const isContentAuthor = contentAuthor.authorId === userId;
    const isAuthor = comment.userId === userId;

    if (!isContentAuthor || !isAuthor) throw new UnauthorizedException();

    try {
      const comment = await this.prisma.comment.delete({
        where: {
          id: commentId,
        },
      });

      await this.contentManagementService.decrementContentComments(
        comment.hostType,
        comment.hostId,
      );

      this.eventClient.emit(
        KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated(comment.hostType),
        new CommentDeletedEvent({
          commentId: comment.id,
          contentId: comment.hostId,
          contentType: comment.hostType,
        }),
      );

      return comment;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async isAuthorOfCommentByUserId(
    commentId: string,
    userId: string,
  ): Promise<boolean> {
    const profileId = await this.profileSerivce.getProfileIdByUserId(userId);
    return this.isAuthorOfCommentByProfileId(commentId, profileId);
  }

  async isAuthorOfCommentByProfileId(
    commentId: string,
    authorProfileId: string,
  ): Promise<boolean> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: commentId,
        },
        select: {
          authorProfileId: true,
        },
        rejectOnNotFound() {
          throw new CommentNotFoundException();
        },
      });

      if (comment.authorProfileId !== authorProfileId)
        throw new UnauthorizedException();
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  async getCommentsOfContent(
    input: GetCommentsOfContent,
    userId: string,
  ): Promise<PaginationCommentsResponse> {
    const { contentId, type, pagination } = input;
    const { skip, take, totalSearched } = ExtractPagination(pagination);
    const canView = await this.canViewComments(type, contentId, userId);
    if (!canView)
      throw new UnauthorizedException('You cannot see this content');
    try {
      const count = await this.prisma.comment.count({
        where: {
          hostId: contentId,
          hostType: type,
        },
      });
      const comments = await this.prisma.comment.findMany({
        take,
        skip,
        where: {
          hostId: contentId,
          hostType: type,
        },
        include: {
          author: true,
        },
      });

      return {
        data: comments,
        total: count,
        hasMore: comments.length >= take,
      };
    } catch (error) {
      this.logger.error(error);
      throw new DBErrorException(
        'Failed to get comments, please try again later',
      );
    }
  }

  async canViewComments(
    contentType: ContentHostType,
    contentId: string,
    userId?: string,
    profileId?: string,
  ): Promise<boolean> {
    return true;
  }

  async canCommentOnContentByUserId(
    contentType: ContentHostType,
    contentId: string,
    contentAuthorProfileId: string,
    userId: string,
  ): Promise<boolean> {
    const profileId = await this.profileSerivce.getProfileIdByUserId(userId);
    return this.canCommentOnContentByProfileId(
      contentType,
      contentId,
      contentAuthorProfileId,
      profileId,
    );
  }
  async canCommentOnContentByProfileId(
    contentType: ContentHostType,
    contentId: string,
    contentAuthorProfileId: string,
    profileId: string,
  ): Promise<boolean> {
    const conditions: boolean[] = [];

    const canInteract = await this.profileSerivce.canInteractWith(
      contentAuthorProfileId,
      profileId,
    );
    if (!canInteract) conditions.push(false);

    const commentsVisiblity =
      await this.contentManagementService.getContentCommentingStatus(
        contentType,
        contentId,
      );
    if (commentsVisiblity !== CommentsPublicStatus) conditions.push(false);

    return conditions.every((c) => c);
  }
}
