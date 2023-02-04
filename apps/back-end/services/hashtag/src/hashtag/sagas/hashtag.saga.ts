import { Inject, Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { map, Observable } from 'rxjs';
import {
  HashtagCreatedEvent as KafkaHashtagCreatedEvent,
  HashtagDeletedEvent as KafkaHashtagDeletedEvent,
} from 'nest-dto';

import { HashtagCreatedEvent, HashtagDeletedEvent } from '../events';

@Injectable()
export class HashtagSaga {
  constructor(
    @Inject(SERVICES.HASHTAG.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @Saga()
  handleHashTagCreated($event: Observable<any>): Observable<any> {
    return $event.pipe(
      ofType(HashtagCreatedEvent),
      map((tag) => {
        this.eventClient.emit(
          KAFKA_EVENTS.HASHTAG.hashtagCreated,
          new KafkaHashtagCreatedEvent({ id: tag.tag.id, name: tag.tag.tag }),
        );
      }),
    );
  }

  @Saga()
  handleHashTagDeleted($event: Observable<any>): Observable<any> {
    return $event.pipe(
      ofType(HashtagDeletedEvent),
      map((tag) => {
        this.eventClient.emit(
          KAFKA_EVENTS.HASHTAG.hashtagCreated,
          new KafkaHashtagDeletedEvent({ id: tag.tag.id }),
        );
      }),
    );
  }
}
