import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BeautyCenterElasticRepository } from '../../repository/beauty-center.elastic.repository';
import { BeautyCenterCreatedEvent } from '../impl';

@EventsHandler(BeautyCenterCreatedEvent)
export class BeautyCenterCreatedEventHandler implements IEventHandler {
  constructor(private readonly elasticdb: BeautyCenterElasticRepository) {}
  handle({ args: { id, location } }: BeautyCenterCreatedEvent) {
    this.elasticdb.indexBeautyCenterDocument({
      dbId: id,
      ...location,
    });
  }
}
