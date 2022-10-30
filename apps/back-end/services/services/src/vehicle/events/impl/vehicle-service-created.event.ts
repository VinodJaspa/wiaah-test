import { VehicleService } from '../../entities';

export class VehicleServiceCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly vehicleService: VehicleService,
  ) {}
}
