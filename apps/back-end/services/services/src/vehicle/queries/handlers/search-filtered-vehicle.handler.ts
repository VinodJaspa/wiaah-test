import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VehicleServiceRepository } from '../../repository';
import { Vehicle } from '../../entities';
import { SearchFilteredVehiclesQuery } from '../impl';

@QueryHandler(SearchFilteredVehiclesQuery)
export class SearchFilteredVehiclesQueryHandler
  implements IQueryHandler<SearchFilteredVehiclesQuery>
{
  constructor(private readonly vehicleRepo: VehicleServiceRepository) {}

  execute({
    args: { input, langId, selectedFields },
  }: SearchFilteredVehiclesQuery): Promise<Vehicle[]> {
    return this.vehicleRepo.searchVehiclesByLocationQuery(
      input,
      langId,
      selectedFields,
    );
  }
}
