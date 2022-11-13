import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { StripeMonthlyPriceCreatedEvent } from '@stripe-billing/events/impl';
import { BillingPriceCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';

@EventsHandler(StripeMonthlyPriceCreatedEvent)
export class StripeMonthlyPriceCreatedEventHandler
  implements IEventHandler<StripeMonthlyPriceCreatedEvent>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({
    input: { ogProductId, productType, stripePriceId },
  }: StripeMonthlyPriceCreatedEvent) {
    console.log('monthly', { ogProductId, productType, stripePriceId });
    this.eventClient.emit(
      KAFKA_EVENTS.BILLING_EVNETS.billingPriceCreated(productType),
      new BillingPriceCreatedEvent({
        priceId: stripePriceId,
        id: ogProductId,
        type: productType,
      }),
    );
  }
}
