import { InsuranceRepository } from '@insurance/repository';
import { Inject } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';

export class BaseCommandHandler {
  constructor(
    public querybus: QueryBus,
    public commandbus: CommandBus,
    public repo: InsuranceRepository,
    public eventbus: EventBus,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    public eventClient: ClientKafka,
  ) {}
}
