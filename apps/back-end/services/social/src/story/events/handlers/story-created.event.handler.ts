import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { StoryCreatedEvent } from '@story/events';
import { KAFKA_EVENTS } from 'nest-utils';
import { StoryCreatedEvent as KafkaStoryCreatedEvent } from 'nest-dto';

@EventsHandler(StoryCreatedEvent)
export class StoryCreatedEventHander
  implements IEventHandler<StoryCreatedEvent>
{
  constructor(private readonly eventclient: ClientKafka) {}

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
