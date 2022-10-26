import {
  EventBus,
  IEventHandler,
  IQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { VehicleServiceRepository } from '../../repository/vehicle-service.repository';
import { VehicleService } from '../../';
import { GetVehicleServiceByIdQuery } from '../impl/get-vehicle-by-id.query';

@QueryHandler(GetVehicleServiceByIdQuery)
export class GetVehicleServiceByIdHandler
  implements IQueryHandler<GetVehicleServiceByIdQuery>
{
  constructor(
    private readonly vehicleRepository: VehicleServiceRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    args: { langId, selectedFields, vehicleId },
  }: GetVehicleServiceByIdQuery): Promise<VehicleService> {
    const service = await this.vehicleRepository.getById(
      vehicleId,
      langId,
      selectedFields,
    );

    return service;
  }
}
