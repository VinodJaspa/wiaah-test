import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  ChatPrivateMessageSentEvent,
  CommentCreatedEvent,
  ContentReactedEvent,
  ContentSharedEvent,
  UserMentionEvent,
} from 'nest-dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KAFKA_EVENTS } from 'nest-utils';
import {
  IncreamentUserCommentReactionInteractionCommand,
  IncreamentUserPostReactionInteractionCommand,
  IncrementUserMentionInteractionCommand,
  IncrementUserMessagesInteractionCommand,
  IncrementUserSharesInteractionCommand,
  IncrementUserCommentsReplyInteractionCommand,
  DecrementUsersInteractionScoreCommand,
} from '@users-interations/commands';
import { ContentTypeEnum, USER_INTERACTION_SCORE } from './const';

let reactionEventPattern = KAFKA_EVENTS.REACTION_EVENTS.contentReacted('*');
@Controller()
export class UsersInteractionsController {
  constructor(private readonly commandbus: CommandBus) {
    console.log(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('*'));
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  handleDecrementUsersInteractionScore() {
    this.commandbus.execute(
      new DecrementUsersInteractionScoreCommand(
        USER_INTERACTION_SCORE.dailyDecrement,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted('*'))
  handleContentReacted(@Payload() { value }: { value: ContentReactedEvent }) {
    const reactedById = value.input.reacterUserId;
    const reactedToId = value.input.contentAuthorUserId;
    const contentType = value.input.contentType;

    console.log('ran');
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

  // @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated('*'))
  // handleContentCommented(@Payload() { value }: { value: CommentCreatedEvent }) {
  //   const commentedById = value.input.commentedByUserId;
  //   const commentedToId = value.input.hostAuthorId;

  //   this.commandbus.execute(
  //     new IncrementUserCommentsReplyInteractionCommand(
  //       commentedById,
  //       commentedToId,
  //     ),
  //   );
  // }

  // @EventPattern(KAFKA_EVENTS.SHARES_EVENTS.contentShared('*'))
  // handleContentShared(@Payload() { value }: { value: ContentSharedEvent }) {
  //   const sharedById = value.input.sharedByUserId;
  //   const sharedContentAuthorId = value.input.contentAuthorUserId;

  //   this.commandbus.execute(
  //     new IncrementUserSharesInteractionCommand(
  //       sharedById,
  //       sharedContentAuthorId,
  //     ),
  //   );
  // }

  // @EventPattern(KAFKA_EVENTS.CHAT.privateMessageSent)
  // handleChatMessageSent(
  //   @Payload() { value }: { value: ChatPrivateMessageSentEvent },
  // ) {
  //   const sentById = value.input.sentById;
  //   const sentToId = value.input.sentToId;

  //   this.commandbus.execute(
  //     new IncrementUserMessagesInteractionCommand(sentById, sentToId),
  //   );
  // }

  // @EventPattern(KAFKA_EVENTS.SOCIAL_EVENTS.userMention())
  // handleUserMentions(@Payload() { value }: { value: UserMentionEvent }) {
  //   const mentionById = value.input.userId;
  //   const mentionToId = value.input.mentionedId;

  //   this.commandbus.execute(
  //     new IncrementUserMentionInteractionCommand(mentionById, mentionToId),
  //   );
  // }
}
