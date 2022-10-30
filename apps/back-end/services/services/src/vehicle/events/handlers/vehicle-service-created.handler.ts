import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VehicleServiceElasticRepository } from '../../repository';
import { VehicleServiceCreatedEvent } from '../impl';

@EventsHandler(VehicleServiceCreatedEvent)
export class handleVehicleServiceCreatedEvent
  implements IEventHandler<VehicleServiceCreatedEvent>
{
  constructor(private readonly elasticRepo: VehicleServiceElasticRepository) {}
  async handle({ userId, vehicleService }: VehicleServiceCreatedEvent) {}
}
