import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateOrUpdateUserElasticCommand } from './commands';

@Controller()
export class SearchUsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated)
  async handleUserDataUpdate(@Payload() value: NewAccountCreatedEvent) {
    await this.commandBus.execute<CreateOrUpdateUserElasticCommand>(
      new CreateOrUpdateUserElasticCommand({
        dbId: value.input.id,
        firstName: value.input.firstName,
        lastName: value.input.lastName,
        username: value.input.username,
      }),
    );
  }
}
