import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { StripeAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { map, Observable } from 'rxjs';

@Injectable()
export class StripeBillingSaga {
  @Saga()
  stripeConnectedAccountCreated($event: Observable<any>): Observable<any> {
    return $event.pipe(
      ofType(StripeAccountCreatedEvent),
      map(({ input: { stripeId, userId } }) => {}),
    );
  }
}
