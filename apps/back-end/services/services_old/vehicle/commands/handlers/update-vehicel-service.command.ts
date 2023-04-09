import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { VehicleServiceRepository } from '../../repository';
import { VehicleService } from '../../entities';
import { UpdateVehicleServiceCommand } from '../impl/update-vehicle-service.command';

@CommandHandler(UpdateVehicleServiceCommand)
export class UpdateVehicleServiveHandler
  implements ICommandHandler<UpdateVehicleServiceCommand>
{
  constructor(private readonly vehicleRepository: VehicleServiceRepository) {}

  execute({
    args: { input, langId, selectedFields, user },
  }: UpdateVehicleServiceCommand): Promise<VehicleService> {
    return this.vehicleRepository.updateService(
      input,
      user.id,
      langId,
      selectedFields,
    );
  }
}
