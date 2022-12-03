import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ManagerService } from './manager.service';
import {
  CommentCreatedEvent,
  CommentMentionedEvent,
  ContentReactedEvent,
  ContentReactedType,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';

@Controller()
export class ManagerController {
  constructor(private readonly notificationsService: ManagerService) {}

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated)
  handleCommentCreatedEvent(@Payload() data: { value: CommentCreatedEvent }) {
    const {
      commentedByUserId,
      hostType,
      mainHostId,
      commentedByProfileId,
      contentOwnerUserId,
    } = data.value.input;
    this.notificationsService.createNotification({
      type: hostType === 'comment' ? 'commentCommented' : 'postCommented',
      authorId: commentedByUserId,
      content: '',
      contentId: mainHostId,
      authorProfileId: commentedByProfileId,
      contentOwnerUserId,
    });
  }

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentMentions)
  handleCommentMentionsEvent(
    @Payload() data: { value: CommentMentionedEvent },
  ) {
    const {
      mentionedIds,
      mentionedByProfileId,
      mainHostId,
      mentionedByUserId,
    } = data.value.input;

    Array.isArray(mentionedIds)
      ? mentionedIds.map((id) => {
          this.notificationsService.createNotification({
            content: '',
            type: 'commentMention',
            authorId: mentionedByUserId,
            authorProfileId: mentionedByProfileId,
            contentOwnerUserId: id.userId,
            contentId: mainHostId,
          });
        })
      : null;
  }

  @EventPattern(KAFKA_EVENTS.REACTION_EVENTS.contentReacted)
  handleContentReactedEvent(@Payload() data: { value: ContentReactedEvent }) {
    const {
      contentAuthorUserId,
      contentId,
      contentTitle,
      contentType,
      reacterProfileId,
      reacterUserId,
    } = data.value.input;

    const postsTypes: ContentReactedType[] = ['newsfeed-post'];

    this.notificationsService.createNotification({
      content: contentTitle,
      contentId,
      type: postsTypes.includes(contentType) ? 'postReacted' : 'commentReacted',
      authorProfileId: reacterProfileId,
      contentOwnerUserId: contentAuthorUserId,
      authorId: reacterUserId,
    });
  }
}
