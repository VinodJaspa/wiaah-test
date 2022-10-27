import { IEvent } from '@nestjs/cqrs';
import { VehicleService, Vehicle } from '../../entities';

export class VehicleCreatedEvent implements IEvent {
  constructor(
    public readonly parantService: VehicleService,
    public readonly vehicle: Vehicle,
    public readonly userId: string,
  ) {}
}
