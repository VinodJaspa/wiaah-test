import { IEvent } from '@nestjs/cqrs';
import { BeautyCenterService } from 'prismaClient';

export class BeautyCenterCreatedEvent implements IEvent {
  constructor(public args: BeautyCenterService) {}
}
