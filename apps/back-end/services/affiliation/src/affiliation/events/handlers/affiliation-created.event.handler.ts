import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { AffiliationCreatedEvent as KafkaAffilationCreatedEvent } from 'nest-dto';
import { AffiliationCreatedEvent } from '@affiliation/events/impl';

@EventsHandler(AffiliationCreatedEvent)
export class AffiliationCreatedEventHandler
  implements IEventHandler<AffiliationCreatedEvent>
{
  constructor(
    @Inject(SERVICES.AFFILIATION_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ affiliation }: AffiliationCreatedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.AFFILIATION.affiliationEntryCreated,
      new KafkaAffilationCreatedEvent({
        affiliatedItemType: affiliation.itemType,
        affiliationId: affiliation.id,
        itemId: affiliation.itemId,
        itemOwnerId: affiliation.sellerId,
      }),
    );
  }
}
