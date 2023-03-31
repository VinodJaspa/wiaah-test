import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { StripeSubscriptionActivatedEvent } from '@stripe-billing/events/impl';
import { SubscriptionPaidEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';

@EventsHandler(StripeSubscriptionActivatedEvent)
export class StripeSubscriptionPaidActivatedHandler
  implements IEventHandler<StripeSubscriptionActivatedEvent>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({
    input: { itemId, userId, endAt, membershipId, startAt },
  }: StripeSubscriptionActivatedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.BILLING_EVNETS.billingSubscriptionActivated(''),
      new SubscriptionPaidEvent({
        id: itemId,
        userId,
        endAt,
        membershipId,
        startAt,
      }),
    );
  }
}
