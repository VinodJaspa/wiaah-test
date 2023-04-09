import { VehicleStatus } from '@vehicle-service/const';

export class UpdateVehicleStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: VehicleStatus,
  ) {}
}
