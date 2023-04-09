import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BeautyCenterElasticRepository } from '../../repository/beauty-center.elastic.repository';
import { BeautyCenterUpdatedEvent } from '../impl';

@EventsHandler(BeautyCenterUpdatedEvent)
export class BeautyCenterUpdatedEventHandler implements IEventHandler {
  constructor(private readonly elasticdbRepo: BeautyCenterElasticRepository) {}
  handle({ updated, old }: BeautyCenterUpdatedEvent) {}
}
