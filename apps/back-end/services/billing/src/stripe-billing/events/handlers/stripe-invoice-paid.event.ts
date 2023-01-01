import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  StripeCheckoutInvoicePaidEvent,
  StripeInvoicePaidEvent,
} from '@stripe-billing/events/impl';
import {
  CheckoutMetadata,
  StripeMetadataObjectType,
} from '@stripe-billing/types';

@EventsHandler(StripeInvoicePaidEvent)
export class StripeInvoicePaidEventHandler
  implements IEventHandler<StripeInvoicePaidEvent>
{
  constructor(private readonly eventbus: EventBus) {}

  handle({ invoice }: StripeInvoicePaidEvent) {
    const meta = invoice.metadata as unknown as {
      type: StripeMetadataObjectType;
    };
    if ('type' in meta) {
      switch (meta.type) {
        case 'checkout':
          this.eventbus.publish(
            new StripeCheckoutInvoicePaidEvent(meta as CheckoutMetadata),
          );
          break;

        default:
          break;
      }
    }
  }
}
