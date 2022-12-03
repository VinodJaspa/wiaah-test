import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { ProductTypeEnum } from '@stripe-billing/const';
import { StripeTieredPriceCreatedEvent } from '@stripe-billing/events/impl';
import { StripeMembershipPricingCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';

@EventsHandler(StripeTieredPriceCreatedEvent)
export class StripeTieredPriceCreatedEventHandler
  implements IEventHandler<StripeTieredPriceCreatedEvent>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({
    input: { productType, stripePriceId, ogProductId },
  }: StripeTieredPriceCreatedEvent) {
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
