import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateUserAuthSettingsCommand } from '@auth-settings/commands';

@Controller()
export class UserAuthSettingsController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated('*', true))
  async handleNewAccount(@Payload() payload: any) {
    console.log('Received NewAccountCreatedEvent:', payload);
  
    const eventData = payload?.value ?? payload;
  
    if (!eventData || !eventData.input) {
      console.error('Invalid event data for NewAccountCreatedEvent:', eventData);
      return;
    }
  
    try {
      await this.commandbus.execute(
        new CreateUserAuthSettingsCommand(eventData.input.email),
      );
      console.log(`Auth settings created for email: ${eventData.input.email}`);
    } catch (error) {
      console.error('Failed to execute CreateUserAuthSettingsCommand:', error);
    }
  }
  
}
