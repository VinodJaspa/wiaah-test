import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { MembershipCreatedEvent as KafkaMembershipCreatedEvent } from 'nest-dto';
import { MembershipCreatedEvent } from '../impl';
import { Inject } from '@nestjs/common';

@EventsHandler(MembershipCreatedEvent)
export class MembershipCreatedEventHandler
  implements IEventHandler<MembershipCreatedEvent>
{
  constructor(
    @Inject(SERVICES.MEMBERSHIP.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ membership }: MembershipCreatedEvent) {
    membership.turnover_rules.forEach((v, i) => {
      this.eventClient.emit(
        KAFKA_EVENTS.MEMBERSHIP.memberShipCreated,
        new KafkaMembershipCreatedEvent({
          price: v.price,
          name: `${membership.name} Tier ${i + 1}`,
          id: v.id,
          active: membership.active,
          pricing: [],
        }),
      );
    });
  }
}
