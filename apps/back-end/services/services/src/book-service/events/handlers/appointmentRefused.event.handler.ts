import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AppointmentRefusedEvent } from '@book-service/events/impl';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';

@EventsHandler(AppointmentRefusedEvent)
export class AppointmentRefusedEventHandler
  implements IEventHandler<AppointmentRefusedEvent>
{
  constructor(
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private eventClient: ClientKafka,
  ) {}
  handle({
    input: { buyerId, id, reason, sellerId, type },
  }: AppointmentRefusedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.SERVICES.appointmentRefused(type),
      new AppointmentRefusedEvent({
        buyerId,
        id,
        reason,
        sellerId,
        type,
      }),
    );
  }
}
