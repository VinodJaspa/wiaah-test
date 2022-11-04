import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ChatMessageSentEvent } from '../impl';
import { ChatMessageSentEvent as KafkaChatMessageSentEvent } from 'nest-dto';
import { Inject } from '@nestjs/common';

@EventsHandler()
export class MessageSentEventHandler
  implements IEventHandler<ChatMessageSentEvent>
{
  constructor(
    @Inject(SERVICES.CHAT.token)
    private readonly eventClient: ClientKafka,
  ) {}
  handle({ message, userId }: ChatMessageSentEvent) {
    this.eventClient.emit<KafkaChatMessageSentEvent>(
      KAFKA_EVENTS.CHAT.messageSent,
      new KafkaChatMessageSentEvent({
        userId,
        messageId: message.id,
      }),
    );
  }
}
