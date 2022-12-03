import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { StripeCheckoutInvoicePaidEvent } from '@stripe-billing/events/impl';
import {
  SellerProductsPurchasedEvent,
  SellerServicePurchasedEvent,
  ServicePurchasedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';

@EventsHandler(StripeCheckoutInvoicePaidEvent)
export class StripeCheckoutInvoicePaidEventHandler
  implements IEventHandler<StripeCheckoutInvoicePaidEvent>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async handle({ meta }: StripeCheckoutInvoicePaidEvent) {
    const { buyerId, sellers, type } = meta;

    for (const seller of sellers) {
      for (const prod of seller.products) {
        if (prod.type === 'product') {
        } else {
          this.eventClient.emit(
            KAFKA_EVENTS.BILLING_EVNETS.sellerServicePurchased(),
            new SellerServicePurchasedEvent({ serviceBookId: prod.id }),
          );
        }
      }
    }
  }
}
