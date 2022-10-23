import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VehicleServiceCreatedEvent } from './vehicle-service-created.event';

@EventsHandler(VehicleServiceCreatedEvent)
export class handleVehicleServiceCreatedEvent
  implements IEventHandler<VehicleServiceCreatedEvent>
{
  async handle(event: VehicleServiceCreatedEvent) {}
}
