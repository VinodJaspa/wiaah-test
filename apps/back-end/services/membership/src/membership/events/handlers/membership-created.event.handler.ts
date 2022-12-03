import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES, sleep } from 'nest-utils';
import {
  BillingMonthlyPriceCreatedEvent,
  MembershipCreatedEvent as KafkaMembershipCreatedEvent,
} from 'nest-dto';
import { MembershipCreatedEvent } from '../impl';
import { Inject } from '@nestjs/common';
import { MembershipPricesType } from '@membership/const';

@EventsHandler(MembershipCreatedEvent)
export class MembershipCreatedEventHandler
  implements IEventHandler<MembershipCreatedEvent>
{
  constructor(
    @Inject(SERVICES.MEMBERSHIP.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async handle({ membership }: MembershipCreatedEvent) {
    for (const rule of membership.turnover_rules) {
      await sleep(100);

      this.eventClient.emit(
        KAFKA_EVENTS.BILLING_EVNETS.createMonthlyBillingPrice,
        new BillingMonthlyPriceCreatedEvent({
          id: rule.id,
          price: rule.price,
          type: MembershipPricesType.turnover,
        }),
      );
    }
  }
}
