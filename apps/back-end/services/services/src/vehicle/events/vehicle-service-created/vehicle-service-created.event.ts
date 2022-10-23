export class VehicleServiceCreatedEvent {
  constructor(
    public readonly vehicleId: string,
    public readonly userId: string,
  ) {}
}
