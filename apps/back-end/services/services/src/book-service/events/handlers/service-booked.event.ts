import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ServiceBookedEvent } from '@book-service/events';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ServiceBookedEvent as KafkaServiceBookedEvent } from 'nest-dto';
import { Inject } from '@nestjs/common';

@EventsHandler(ServiceBookedEvent)
export class ServiceBookedEventHandler
  implements IEventHandler<ServiceBookedEvent>
{
  constructor(
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ service }: ServiceBookedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.SERVICES.serviceBooked(service.type),
      new KafkaServiceBookedEvent({
        id: service.id,
        purchaserId: service.purchaserId,
        sellerId: service.sellerId,
        type: service.type,
        bookId: service.id,
      }),
    );
  }
}
