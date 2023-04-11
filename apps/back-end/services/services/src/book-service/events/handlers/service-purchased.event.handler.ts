import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ServicePurchasedEvent } from '@book-service/events';
import { Inject } from '@nestjs/common';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { ServicePurchasedEvent as kafkaServicePurchasedEvent } from 'nest-dto';

@EventsHandler(ServicePurchasedEvent)
export class ServicePurchasedEventHandler
  implements IEventHandler<ServicePurchasedEvent>
{
  constructor(
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ service }: ServicePurchasedEvent) {
    this.eventClient.emit(
      KAFKA_EVENTS.SERVICES.servicePurchased(service.type),
      new kafkaServicePurchasedEvent({
        purchaserId: service.ownerId,
        sellerId: service.providerId,
        serviceId: service.serviceId,
        type: service.type,
      }),
    );
  }
}
