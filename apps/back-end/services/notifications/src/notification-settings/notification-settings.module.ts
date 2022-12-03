import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationSettingsService } from './notification-settings.service';
import { NotificationSettingsResolver } from './notification-settings.resolver';
import { NotificationSettingsController } from './notification-settings.controller';
import { PrismaService } from 'prismaService';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  providers: [
    NotificationSettingsResolver,
    NotificationSettingsService,
    PrismaService,
  ],
  controllers: [NotificationSettingsController],
  exports: [NotificationSettingsService],
})
export class NotificationSettingsModule {}
