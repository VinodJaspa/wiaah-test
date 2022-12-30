import { EventsHandler } from '@nestjs/cqrs';
import { WithdrawalProcessedEvent } from '../impl';
import { IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { WithdrawalProcessedEvent as WithdrawalProcessedKafkaEvent } from 'nest-dto';

@EventsHandler(WithdrawalProcessedEvent)
export class WithdrawalProcessedEventHandler
  implements IEventHandler<WithdrawalProcessedEvent>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ withdrawal }: WithdrawalProcessedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.BILLING_EVNETS.withdrawalProcessed(),
      new WithdrawalProcessedKafkaEvent({
        amount: withdrawal.amount,
        userId: withdrawal.userId,
      }),
    );
  }
}
