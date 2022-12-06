import { Inject } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { OrdersRepository } from '@orders/repositoy';
import { SERVICES } from 'nest-utils';

export class BaseController {
  constructor(
    public querybus: QueryBus,
    public commandbus: CommandBus,
    public eventbus: EventBus,
    @Inject(SERVICES.ORDERS_SERVICE.token)
    public eventClient: ClientKafka,
    public repo: OrdersRepository,
  ) {}
}
