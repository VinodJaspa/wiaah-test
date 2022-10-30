import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { CreateVehicleServiceCommand } from '../../commands';
import { VehicleService } from '../../entities';
import { VehicleServiceRepository } from '../../repository';
import { VehicleCreatedEvent, VehicleServiceCreatedEvent } from '../../events';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateVehicleServiceCommand)
export class CreateVehicleServiceHandler
  implements ICommandHandler<CreateVehicleServiceCommand>
{
  constructor(
    private readonly vehicleRepository: VehicleServiceRepository,
    private readonly eventBus: EventBus,
  ) {}

  logger = new Logger();

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
        //@ts-ignore
        vehicles: true,
      },
    );
    try {
      this.eventBus.publish(new VehicleServiceCreatedEvent(res.ownerId, res));
      if (Array.isArray(res.vehicles)) {
        res.vehicles.forEach((v) => {
          this.eventBus.publish<VehicleCreatedEvent>(
            new VehicleCreatedEvent(res, v, res.id),
          );
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
    return res;
  }
}
