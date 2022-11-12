import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { ProductTypeEnum } from '@stripe-billing/const';
import { StripeMonthlyPriceCreatedEvent } from '@stripe-billing/events/impl';
import { StripeMembershipPricingCreatedEvent } from 'nest-dto';
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
    if (productType === ProductTypeEnum.membership) {
      this.eventClient.emit(
        KAFKA_EVENTS.BILLING_EVNETS.stripeMembershipPricingCreated,
        new StripeMembershipPricingCreatedEvent({
          priceId: stripePriceId,
          membershipId: ogProductId,
        }),
      );
    }
  }
}
