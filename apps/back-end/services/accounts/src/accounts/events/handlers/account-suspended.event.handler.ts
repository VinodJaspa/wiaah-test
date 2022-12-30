import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { AccountSuspendedEvent } from '../impl';
import { AccountSuspendedEvent as AccountSuspendedKafkaEvent } from 'nest-dto';

@EventsHandler(AccountSuspendedEvent)
export class AccountSuspensedEventHandler
  implements IEventHandler<AccountSuspendedEvent>
{
  constructor(
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ account }: AccountSuspendedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.ACCOUNTS_EVENTS.accountSuspended,
      new AccountSuspendedKafkaEvent({
        id: account.id,
        reason: account.rejectReason,
      }),
    );
  }
}
