import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VehicleServicesFetched, VehicleService } from '@vehicle-service';

import { GetAllVehiclesQuery } from '../';
import { VehicleServiceRepository } from '../../repository/vehicle-service.repository';

@QueryHandler(GetAllVehiclesQuery)
export class GetAllVehicleQueryHandler
  implements IQueryHandler<GetAllVehiclesQuery>
{
  constructor(
    private readonly vehicleServiceRepository: VehicleServiceRepository,
    private readonly eventBus: EventBus,
  ) {}

  execute(query: GetAllVehiclesQuery): Promise<VehicleService[]> {
    this.eventBus.publish(new VehicleServicesFetched());
    return this.vehicleServiceRepository.getAll(query?.langId);
  }
}
