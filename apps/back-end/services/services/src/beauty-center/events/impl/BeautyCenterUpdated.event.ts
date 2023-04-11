import { IEvent } from '@nestjs/cqrs';
import { BeautyCenterService } from 'prismaClient';

export class BeautyCenterUpdatedEvent implements IEvent {
  constructor(
    public updated: BeautyCenterService,
    public old: BeautyCenterService,
  ) {}
}
