import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { StripeSubscriptionPastDueEvent } from '../impl';
import { StripeSubscriptionPastDueEvent as StripeSubPastdueEvent } from 'nest-dto';

@EventsHandler(StripeSubscriptionPastDueEvent)
export class StripeSubscriptionPastDueEventHandler
  implements IEventHandler<StripeSubscriptionPastDueEvent>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle(event: StripeSubscriptionPastDueEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.BILLING_EVNETS.billingSubscriptionPastdue(''),
      new StripeSubPastdueEvent({
        subscriptionStripeId: event.stripeSubid,
        userId: event.userId,
      }),
    );
  }
}
