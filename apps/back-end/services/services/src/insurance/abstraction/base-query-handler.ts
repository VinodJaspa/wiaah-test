import { InsuranceRepository } from '@insurance/repository';
import { Inject } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';

export class InsuranceBaseQueryHandler {
  constructor(
    public querybus: QueryBus,
    public commandbus: CommandBus,
    public eventbus: EventBus,
    public repo: InsuranceRepository,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    public eventClient: ClientKafka,
  ) {}
}
