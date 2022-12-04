import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { ProductStatus, PRODUCT_SERVICE_KEY } from '@products/const';
import { ContentSuspendedEvent, ContentSuspenseRequestEvent } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ProductUpdatedEvent } from '../impl';

@EventsHandler(ProductUpdatedEvent)
export class ProductStatusUpdatedEventHandler
  implements IEventHandler<ProductUpdatedEvent>
{
  constructor(
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}
  handle({ input, prod }: ProductUpdatedEvent) {
    const status = input.status;
    switch (status) {
      case ProductStatus.suspended:
        break;

      default:
        break;
    }
  }
}
