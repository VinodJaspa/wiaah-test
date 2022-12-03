import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ContentSuspendedEvent } from '@content-suspense/events/impl';
import { ContentSuspenseBaseHandler } from '@content-suspense/abastraction';
import { KAFKA_EVENTS } from 'nest-utils';
import { ContentSuspendedEvent as KafkaContentSuspendedEvent } from 'nest-dto';

@EventsHandler(ContentSuspendedEvent)
export class ContentSuspendedEventHandler
  extends ContentSuspenseBaseHandler
  implements IEventHandler<ContentSuspendedEvent>
{
  handle({ input, userId }: ContentSuspendedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.MODERATION.contentSuspensed(input.type),
      new KafkaContentSuspendedEvent({ ...input, suspensedById: userId }),
    );
  }
}
