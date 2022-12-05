import { Inject } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { ProductRepository } from '@products/repository';
import { SERVICES } from 'nest-utils';

export class BaseQueryHandler {
  querybus: QueryBus;
  commandbus: CommandBus;
  eventbus: EventBus;
  eventClient: ClientKafka;
  repo: ProductRepository;
  constructor(
    querybus: QueryBus,
    commandbus: CommandBus,
    eventbus: EventBus,
    repo: ProductRepository,
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    eventClient: ClientKafka,
  ) {
    this.querybus = querybus;
    this.commandbus = commandbus;
    this.eventbus = eventbus;
    this.eventClient = eventClient;
    this.repo = repo;
  }
}
