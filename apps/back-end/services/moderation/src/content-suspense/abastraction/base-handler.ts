import { Inject } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';

export class ContentSuspenseBaseHandler {
  querybus: QueryBus;
  commandbus: CommandBus;
  eventbus: EventBus;
  eventClient: ClientKafka;
  constructor(
    @Inject(SERVICES.ACCOUNTS_SERVICE) eventClient: ClientKafka,
    querybus: QueryBus,
    commandbus: CommandBus,
    eventbus: EventBus,
  ) {
    this.querybus = querybus;
    this.commandbus = commandbus;
    this.eventbus = eventbus;
    this.eventClient = eventClient;
  }
}
