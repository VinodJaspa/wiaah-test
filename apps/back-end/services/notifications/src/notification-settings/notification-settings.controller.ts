import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { NotificationSettingsService } from './notification-settings.service';

@Controller()
export class NotificationSettingsController {
  private readonly logger = new Logger(NotificationSettingsController.name);

  constructor(
    private readonly notiSettingsService: NotificationSettingsService,
  ) {}

  @EventPattern('account.created.buyer')
  handleBuyerAccountCreated(@Payload() data: NewAccountCreatedEvent) {
    this.logger.log(`Received buyer account created event for ID: ${data.input.id}`);
    this.notiSettingsService.createAccountNotifciationSettings(data.input.id);
  }
  
  @EventPattern('account.created.seller')
  handleSellerAccountCreated(@Payload() data: NewAccountCreatedEvent) {
    this.logger.log(`Received seller account created event for ID: ${data.input.id}`);
    this.notiSettingsService.createAccountNotifciationSettings(data.input.id);
  }
}
