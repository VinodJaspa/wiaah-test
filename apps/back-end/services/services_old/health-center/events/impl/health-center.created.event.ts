import { IEvent } from '@nestjs/cqrs';
import { HealthCenterService } from 'prismaClient';

export class HealthCenterCreatedEvent implements IEvent {
  constructor(public readonly input: HealthCenterService) {}
}
