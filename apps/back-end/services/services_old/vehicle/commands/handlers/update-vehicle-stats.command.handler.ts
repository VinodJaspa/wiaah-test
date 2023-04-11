import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateVehicleStatusCommand } from '@vehicle-service/commands/impl';
import {
  VehicleRepository,
  VehicleServiceRepository,
} from '@vehicle-service/repository';
import { VehicleService } from 'prismaClient';

@CommandHandler(UpdateVehicleStatusCommand)
export class UpdateVehicleStatusCommandHandler
  implements ICommandHandler<UpdateVehicleStatusCommand>
{
  constructor(private readonly repo: VehicleServiceRepository) {}

  execute({ id, status }: UpdateVehicleStatusCommand): Promise<VehicleService> {
    return this.repo.updateOneStatus(id, status);
  }
}
