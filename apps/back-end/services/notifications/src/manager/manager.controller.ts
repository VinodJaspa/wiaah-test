import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MangerService } from './manager.service';
import {
  CommentCreatedEvent,
  CommentMentionedEvent,
  ContentReactedEvent,
  ContentReactedType,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';

@Controller('manger')
export class ManagerController {
  constructor(private readonly notificationsService: MangerService) {}

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated)
  handleCommentCreatedEvent(@Payload() data: CommentCreatedEvent) {
    const { commentedByUserId, hostType, mainHostId, commentedByProfileId } =
      data.input;
    this.notificationsService.createNotification({
      type: hostType === 'comment' ? 'commentCommented' : 'postCommented',
      userId: commentedByUserId,
      content: '',
      contentId: mainHostId,
      authorProfileId: commentedByProfileId,
    });
  }

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentMentions)
  handleCommentMentionsEvent(@Payload() data: CommentMentionedEvent) {
    const { mentionedIds, mentionedByProfileId, mainHostId } = data.input;

    Array.isArray(mentionedIds)
      ? mentionedIds.map((id) => {
          this.notificationsService.createNotification({
            content: '',
            type: 'commentMention',
            userId: id.userId,
            authorProfileId: mentionedByProfileId,
            contentId: mainHostId,
          });
        })
      : null;
  }

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted)
  handleContentReactedEvent(@Payload() data: ContentReactedEvent) {
    const {
      contentAuthorUserId,
      contentId,
      contentTitle,
      contentType,
      reacterProfileId,
    } = data.input;

    const postsTypes: ContentReactedType[] = ['newsfeed-post'];

    this.notificationsService.createNotification({
      content: contentTitle,
      contentId,
      type: postsTypes.includes(contentType) ? 'postReacted' : 'commentReacted',
      authorProfileId: reacterProfileId,
      userId: contentAuthorUserId,
    });
  }
}
