import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SellerAccountRefusedEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { SellerAccountRequestDeclinedEvent } from '../impl';

@EventsHandler(SellerAccountRequestDeclinedEvent)
export class SellerAccountRequestDeclinedEventHandler
  implements IEventHandler<SellerAccountRequestDeclinedEvent>
{
  constructor(
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ account }: SellerAccountRequestDeclinedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.ACCOUNTS_EVENTS.sellerAccountRefused,
      new SellerAccountRefusedEvent({
        email: account.email,
        firstName: account.firstName,
        id: account.id,
        lastName: account.lastName,
        reason: account.rejectReason,
      }),
    );
  }
}
