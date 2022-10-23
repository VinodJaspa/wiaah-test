import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateVehicleServiceCommand,
  VehicleService,
  VehicleServiceCreatedEvent,
  VehicleServiceRepository,
} from '@vehicle-service';

@CommandHandler(CreateVehicleServiceCommand)
export class CreateVehicleServiceHandler
  implements ICommandHandler<CreateVehicleServiceCommand>
{
  constructor(
    private readonly vehicleRepository: VehicleServiceRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    createVehicleServiceInput,
    selectedFields,
    user,
  }: CreateVehicleServiceCommand): Promise<VehicleService> {
    const res = await this.vehicleRepository.create(
      createVehicleServiceInput,
      user.id,
      {
        ...selectedFields,
        id: true,
        ownerId: true,
      },
    );

    this.eventBus.publish(new VehicleServiceCreatedEvent(res.id, res.ownerId));
    return res;
  }
}
