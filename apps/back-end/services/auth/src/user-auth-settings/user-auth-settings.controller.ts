import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateUserAuthSettingsCommand } from '@auth-settings/commands';

@Controller()
export class UserAuthSettingsController {
  constructor(private readonly commandbus: CommandBus) {}

  // @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated('seller', true))
  // handleNewAccount(@Payload() { value }: { value: NewAccountCreatedEvent }) {
  //   this.commandbus.execute<CreateUserAuthSettingsCommand>(
  //     new CreateUserAuthSettingsCommand(value.input.id),
  //   );
  // }
}
