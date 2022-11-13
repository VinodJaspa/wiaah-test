import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { StripeSubscriptionPaidEvent } from '@stripe-billing/events/impl';
import { SubscriptionPaidEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';

@EventsHandler(StripeSubscriptionPaidEvent)
export class StripeSubscriptionPaidEventHandler
  implements IEventHandler<StripeSubscriptionPaidEvent>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ input: { itemId, itemType, userId } }: StripeSubscriptionPaidEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.BILLING_EVNETS.billingSubscriptionPaid(itemType),
      new SubscriptionPaidEvent({ id: itemId, userId, type: itemType }),
    );
  }
}
