import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';
import { OrderCreatedEvent } from '../impl';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedKafkaEventHandler
  implements IEventHandler<OrderCreatedEvent>
{
  constructor(
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly querybus: QueryBus,
  ) {}
  async handle({ order }: OrderCreatedEvent) {}
}
