import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ActionCreatedEvent } from '@action/events/impl';
import { Inject } from '@nestjs/common';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { ACTION_CONTENT_TYPE } from '@action/const';
import { UserMentionEvent, UserTaggedEvent } from 'nest-dto';

@EventsHandler(ActionCreatedEvent)
export class ActionTagsEventHandler
  implements IEventHandler<ActionCreatedEvent>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ action }: ActionCreatedEvent) {
    action.mentions.forEach((mention) => {
      this.eventClient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.userTag(ACTION_CONTENT_TYPE),
        new UserTaggedEvent({
          contentAuthorId: action.id,
          contentId: action.id,
          contentType: ACTION_CONTENT_TYPE,
          userId: mention.userId,
        }),
      );
    });
  }
}

@EventsHandler(ActionCreatedEvent)
export class ActionMentionEventHandler
  implements IEventHandler<ActionCreatedEvent>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ action }: ActionCreatedEvent) {
    action.mentions.forEach((mention) => {
      this.eventClient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.userMention(ACTION_CONTENT_TYPE),
        new UserMentionEvent({
          hostId: action.id,
          hostType: ACTION_CONTENT_TYPE,
          mentionedId: mention.userId,
          userId: action.userId,
        }),
      );
    });
  }
}
