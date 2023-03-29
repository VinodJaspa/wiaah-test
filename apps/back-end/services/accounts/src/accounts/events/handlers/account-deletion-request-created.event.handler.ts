import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { CreateScheduledEvent } from 'nest-dto';
import {
  AddToDate,
  FEATURES_EVENT_TRIGGER_ID,
  KAFKA_EVENTS,
  SERVICES,
} from 'nest-utils';
import { AccountDeletionRequestCreatedEvent } from '../impl';

@EventsHandler(AccountDeletionRequestCreatedEvent)
export class AccountDeletionRequestCreatedEventHandler
  implements IEventHandler<AccountDeletionRequestCreatedEvent>
{
  constructor(
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ request }: AccountDeletionRequestCreatedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.EVENT_SCHEDULING.createEvent,
      new CreateScheduledEvent({
        event: KAFKA_EVENTS.ACCOUNTS_EVENTS.deleteAccount,
        payload: JSON.stringify({ id: request.id }),
        triggerAt: AddToDate(new Date(), { days: 30 }).toISOString(),
        triggerId: FEATURES_EVENT_TRIGGER_ID.accounts(
          request.accountId,
          KAFKA_EVENTS.ACCOUNTS_EVENTS.deleteAccount,
        ),
      }),
    );
  }
}
