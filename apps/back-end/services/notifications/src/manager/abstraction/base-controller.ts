import { ManagerService } from '@manager/manager.service';
import { Inject } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';

export class NotifciationBaseController {
  constructor(
    public querybus: QueryBus,
    public commandbus: CommandBus,
    public eventbus: EventBus,
    @Inject(SERVICES.NOTIFICATIONS.token)
    public eventClient: ClientKafka,
    public service: ManagerService,
  ) {}
}
