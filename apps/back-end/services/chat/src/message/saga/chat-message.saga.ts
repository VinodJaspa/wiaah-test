import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { KafkaPubsubService, KAFKA_EVENTS } from 'nest-utils';
import { map, Observable } from 'rxjs';
import { ChatMessage } from '../entities';
import { ChatMessageSentEvent } from '../events';

@Injectable()
export class ChatMessageSaga {
  constructor(private readonly pubsub: KafkaPubsubService) {}

  @Saga()
  chatMessageSent($event: Observable<any>): Observable<any> {
    return $event.pipe(
      ofType(ChatMessageSentEvent),
      map((v) => {
        this.pubsub.publish<ChatMessage>(
          KAFKA_EVENTS.SUBSCRIPTIONS.chatMessageSent(v.message.roomId),
          v.message,
        );
      }),
    );
  }
}
