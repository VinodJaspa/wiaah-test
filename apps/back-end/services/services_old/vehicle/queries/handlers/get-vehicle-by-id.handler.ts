import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Vehicle } from '../../entities';
import { VehicleRepository } from '../../repository';
import { GetVehicleByIdQuery } from '../impl';

@QueryHandler(GetVehicleByIdQuery)
export class GetVehicleByIdQueryHandler
  implements IQueryHandler<GetVehicleByIdQuery>
{
  constructor(private readonly vehicleRepo: VehicleRepository) {}

  execute({
    args: { langId, selectedFields, userId, vehicleId },
  }: GetVehicleByIdQuery): Promise<Vehicle> {
    return this.vehicleRepo.getById(vehicleId, userId, langId, selectedFields);
  }
}
