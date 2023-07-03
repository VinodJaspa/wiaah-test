import { MailingService } from '@mailing/mailing.service';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';

export class BaseController {
  constructor(
    public querybus: QueryBus,
    public commandbus: CommandBus,
    public eventbus: EventBus,
    @Inject(SERVICES.MAILING_SERVICE.token)
    public eventClient: ClientKafka,
    public mailingService: MailingService,
    public config: ConfigService,
  ) {}
}
