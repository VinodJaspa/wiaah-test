import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  ChatPrivateMessageSentEvent,
  CommentCreatedEvent,
  ContentReactedEvent,
  ContentSharedEvent,
  GetBulkUserMostInteractionersMessage,
  GetBulkUserMostInteractionersMessageReply,
  GetUserMostInteractionersMessage,
  GetUserMostInteractionersMessageReply,
  PostSavedEvent,
  ProfileVisitedEvent,
  UserMentionEvent,
} from 'nest-dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExtractPagination, KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';
import {
  IncreamentUserCommentReactionInteractionCommand,
  IncreamentUserPostReactionInteractionCommand,
  IncrementUserMentionInteractionCommand,
  IncrementUserMessagesInteractionCommand,
  IncrementUserSharesInteractionCommand,
  IncrementUserCommentsReplyInteractionCommand,
  DecrementUsersInteractionScoreCommand,
  IncrementUserProfileVisitsInteractionCommand,
  IncrementUserPostSaveInteractionCommand,
} from '@users-interations/commands';
import { ContentTypeEnum, USER_INTERACTION_SCORE } from './const';
import { PrismaService } from 'prismaService';

@Controller()
export class UsersInteractionsController {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleDecrementUsersInteractionScore() {
    this.commandbus.execute(
      new DecrementUsersInteractionScoreCommand(
        USER_INTERACTION_SCORE.dailyDecrement,
      ),
    );
  }

  // TODO: handle get users interaction scores message
  @MessagePattern(KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUserMostInteractioners())
  async getUserMostInteractioners(
    @Payload() { value }: { value: GetUserMostInteractionersMessage },
  ): Promise<GetUserMostInteractionersMessageReply> {
    const { skip, take } = ExtractPagination(value.input.pagination);
    const res = await this.prisma.usersInteractions.findMany({
      where: {
        ownerId: value.input.userId,
      },
      orderBy: {
        interactionScore: 'desc',
      },
      skip,
      take,
    });

    return new GetUserMostInteractionersMessageReply({
      error: null,
      success: true,
      data: {
        users: res.map(({ userId, interactionScore }) => ({
          id: userId,
          score: interactionScore,
        })),
      },
    });
  }

  @MessagePattern(KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUserMostInteractioners())
  async getBulkUserMostInteractioners(
    @Payload() { value }: { value: GetBulkUserMostInteractionersMessage },
  ): Promise<GetBulkUserMostInteractionersMessageReply> {
    const { skip, take } = ExtractPagination(value.input.pagination);
    const res = await this.prisma.usersInteractions.findMany({
      where: {
        ownerId: {
          in: value.input.userIds,
        },
      },
      orderBy: {
        interactionScore: 'desc',
      },
      skip,
      take,
    });

    return new GetBulkUserMostInteractionersMessageReply({
      error: null,
      success: true,
      data: {
        users: value.input.userIds.map((id) => {
          const users = res.filter((v) => v.ownerId === id);

          return {
            id,
            users: users.map(({ id, interactionScore }) => ({
              id,
              score: interactionScore,
            })),
          };
        }),
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('story'))
  handleContentReacted(@Payload() { value }: { value: ContentReactedEvent }) {
    const reactedById = value.input.reacterUserId;
    const reactedToId = value.input.contentAuthorUserId;
    const contentType = value.input.contentType;

    switch (contentType) {
      case ContentTypeEnum.comment:
        this.commandbus.execute(
          new IncreamentUserCommentReactionInteractionCommand(
            reactedById,
            reactedToId,
          ),
        );
        break;
      case ContentTypeEnum.newsfeed_post:
      case ContentTypeEnum.product_post:
      case ContentTypeEnum.service_post:
      case ContentTypeEnum.action:
        this.commandbus.execute(
          new IncreamentUserPostReactionInteractionCommand(
            reactedById,
            reactedToId,
          ),
        );
        break;
      default:
        break;
    }
  }

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated('story'))
  handleContentCommented(@Payload() { value }: { value: CommentCreatedEvent }) {
    const commentedById = value.input.commentedByUserId;
    const commentedToId = value.input.hostAuthorId;

    this.commandbus.execute(
      new IncrementUserCommentsReplyInteractionCommand(
        commentedById,
        commentedToId,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.SHARES_EVENTS.contentShared('story'))
  handleContentShared(@Payload() { value }: { value: ContentSharedEvent }) {
    const sharedById = value.input.sharedByUserId;
    const sharedContentAuthorId = value.input.contentAuthorUserId;

    this.commandbus.execute(
      new IncrementUserSharesInteractionCommand(
        sharedById,
        sharedContentAuthorId,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.CHAT.privateMessageSent)
  handleChatMessageSent(
    @Payload() { value }: { value: ChatPrivateMessageSentEvent },
  ) {
    const sentById = value.input.sentById;
    const sentToId = value.input.sentToId;

    this.commandbus.execute(
      new IncrementUserMessagesInteractionCommand(sentById, sentToId),
    );
  }

  @EventPattern(KAFKA_EVENTS.SOCIAL_EVENTS.userMention('story'))
  handleUserMentions(@Payload() { value }: { value: UserMentionEvent }) {
    const mentionById = value.input.userId;
    const mentionToId = value.input.mentionedId;
    if (mentionById && mentionToId) {
      this.commandbus.execute(
        new IncrementUserMentionInteractionCommand(mentionById, mentionToId),
      );
    }
  }

  @EventPattern(KAFKA_EVENTS.PROFILE_EVENTS.profileVisited('buyer'))
  handleProfileVisit(@Payload() { value }: { value: ProfileVisitedEvent }) {
    const userId = value.input.visitorId;
    const profileAuthorId = value.input.profileAuthorId;

    if (userId && profileAuthorId) {
      this.commandbus.execute(
        new IncrementUserProfileVisitsInteractionCommand(
          userId,
          profileAuthorId,
        ),
      );
    }
  }

  @EventPattern(KAFKA_EVENTS.SOCIAL_EVENTS.postSaved('story'))
  handlePostSaved(@Payload() { value }: { value: PostSavedEvent }) {
    const userId = value.input.saverId;
    const authorId = value.input.postAuthorId;
    if (userId && authorId) {
      this.commandbus.execute(
        new IncrementUserPostSaveInteractionCommand(userId, authorId),
      );
    }
  }
}
