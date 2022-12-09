import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationSettingsService } from './notification-settings.service';
import { NotificationSettingsResolver } from './notification-settings.resolver';
import { NotificationSettingsController } from './notification-settings.controller';
import { PrismaService } from 'prismaService';

@Module({
  imports: [CqrsModule],
  providers: [
    NotificationSettingsResolver,
    NotificationSettingsService,
    PrismaService,
  ],
  controllers: [NotificationSettingsController],
  exports: [NotificationSettingsService],
})
export class NotificationSettingsModule {}
