import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VehicleServiceElasticRepository } from 'src/vehicle/repository';
import { VehicleCreatedEvent } from '../impl';

@EventsHandler(VehicleCreatedEvent)
export class VehicleCreatedEventHandler
  implements IEventHandler<VehicleCreatedEvent>
{
  constructor(private readonly elasticRepo: VehicleServiceElasticRepository) {}

  handle({ parantService, vehicle }: VehicleCreatedEvent) {
    this.elasticRepo.indexVehicle({
      dbId: vehicle.id,
      ...parantService.location,
    });
  }
}
