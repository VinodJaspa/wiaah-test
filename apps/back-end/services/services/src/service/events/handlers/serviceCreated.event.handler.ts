import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ServiceCreatedEvent } from '../impl';
import { Inject } from '@nestjs/common';
import { SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';

@EventsHandler(ServiceCreatedEvent)
export class ServiceCreatedEventHandler
  implements IEventHandler<ServiceCreatedEvent>
{
  constructor(
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly kafkaClient: ClientKafka,
  ) {}

  handle(event: ServiceCreatedEvent) {}
}
