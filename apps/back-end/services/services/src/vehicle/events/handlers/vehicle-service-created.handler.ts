import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { VehicleServiceCreatedEvent } from '../impl';

@EventsHandler(VehicleServiceCreatedEvent)
export class handleVehicleServiceCreatedEvent
  implements IEventHandler<VehicleServiceCreatedEvent>
{
  async handle(event: VehicleServiceCreatedEvent) {
    console.log({ event });
  }
}
