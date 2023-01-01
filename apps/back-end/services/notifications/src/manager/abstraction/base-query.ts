import { Inject } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';
import { ManagerService } from '../manager.service';

export class NotifciationsBaseQueryHandler {
  constructor(
    public querybus: QueryBus,
    public commandbus: CommandBus,
    public eventbus: EventBus,
    public service: ManagerService,
    @Inject(SERVICES.NOTIFICATIONS.token)
    public eventClient: ClientKafka,
  ) {}
}
