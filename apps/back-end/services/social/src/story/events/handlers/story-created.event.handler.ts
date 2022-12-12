import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { StoryCreatedEvent } from '@story/events';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import {
  StoryCreatedEvent as KafkaStoryCreatedEvent,
  UserMentionEvent,
} from 'nest-dto';
import { STORY_TYPE } from '@story/const';
import { Inject } from '@nestjs/common';

@EventsHandler(StoryCreatedEvent)
export class StoryCreatedEventHander
  implements IEventHandler<StoryCreatedEvent>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventclient: ClientKafka,
  ) {}

  handle({ story, user }: StoryCreatedEvent) {
    this.eventclient.emit(
      KAFKA_EVENTS.STORIES.storyCreated,
      new KafkaStoryCreatedEvent({
        id: story.id,
        userId: user.id,
      }),
    );
  }
}

@EventsHandler(StoryCreatedEvent)
export class StoryMentionsEventHander
  implements IEventHandler<StoryCreatedEvent>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventclient: ClientKafka,
  ) {}

  handle({ story }: StoryCreatedEvent) {
    story.mentions.forEach((mention) => {
      this.eventclient.emit(
        KAFKA_EVENTS.SOCIAL_EVENTS.userMention(STORY_TYPE),
        new UserMentionEvent({
          hostId: story.id,
          hostType: STORY_TYPE,
          mentionedId: mention.userId,
          userId: story.publisherId,
        }),
      );
    });
  }
}
