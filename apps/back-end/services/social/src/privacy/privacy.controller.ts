import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AccountDeletedEvent, NewAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import {
  CreateUserPrivacySettingsCommand,
  DeleteUserPrivacySettingsCommand,
} from '@privacy-settings/commands';

@Controller()
export class PrivacyController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated('*', true))
  handleAccountCreated(
    @Payload() { value }: { value: NewAccountCreatedEvent },
  ) {
    this.commandBus.execute<CreateUserPrivacySettingsCommand>(
      new CreateUserPrivacySettingsCommand(value.input.id),
    );
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountDeleted)
  handleAccountDeleted(@Payload() { value }: { value: AccountDeletedEvent }) {
    this.commandBus.execute<DeleteUserPrivacySettingsCommand>(
      new DeleteUserPrivacySettingsCommand(value.input.accountId),
    );
  }
}
