import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MangerService } from './manager.service';
import {
  CommentCreatedEvent,
  CommentMentionedEvent,
  NewAccountCreatedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';

@Controller('manger')
export class MangerController {
  constructor(private readonly notificationsService: MangerService) {}

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated)
  handleCommentCreatedEvent(@Payload() data: CommentCreatedEvent) {
    const { commentedByUserId, hostType } = data.input;
    this.notificationsService.createNotification({
      type: hostType === 'comment' ? 'commentCommented' : 'postCommented',
      userId: commentedByUserId,
      content: '',
    });
  }

  @EventPattern(KAFKA_EVENTS.COMMENTS_EVENTS.commentMentions)
  handleCommentMentionsEvent(@Payload() data: CommentMentionedEvent) {
    const { mentionedIds, mentionedByProfileId } = data.input;

    Array.isArray(mentionedIds)
      ? mentionedIds.map((id) => {
          this.notificationsService.createNotification({
            content: '',
            type: 'commentMention',
            userId: id.userId,
            authorProfileId: mentionedByProfileId,
          });
        })
      : null;
  }
}
