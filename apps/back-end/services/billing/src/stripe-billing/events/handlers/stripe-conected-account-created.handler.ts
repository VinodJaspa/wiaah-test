import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { StripeAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

import { StripeConnectedAccountCreatedEvent } from '../impl';

@EventsHandler(StripeConnectedAccountCreatedEvent)
export class StripeConnectedAccountCreatedEventHandler
  implements IEventHandler<StripeConnectedAccountCreatedEvent>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly prisma: PrismaService,
  ) {}

  async handle({
    input: { stripeId, userId },
  }: StripeConnectedAccountCreatedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.BILLING_EVNETS.stripeAccountCreated,
      new StripeAccountCreatedEvent({ stripeId, userId }),
    );
  }
}
