import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { NotificationSettingsService } from './notification-settings.service';

@Controller('notification-settings')
export class NotificationSettingsController {
  constructor(
    private readonly notiSettingsService: NotificationSettingsService,
  ) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENT.accountCreated)
  handleNewAccountCreated(@Payload() data: NewAccountCreatedEvent) {
    const { id } = data.input;
    this.notiSettingsService.createAccountNotifciationSettings(id);
  }
}
