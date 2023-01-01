import { Inject } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';

export class BaseQueryHandler {
  constructor(
    public querybus: QueryBus,
    public commandbus: CommandBus,
    public eventbus: EventBus,
    @Inject(SERVICES.MAILING_SERVICE.token)
    public eventClient: ClientKafka,
  ) {}
}
