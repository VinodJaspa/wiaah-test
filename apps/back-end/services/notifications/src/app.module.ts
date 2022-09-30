import { Module } from '@nestjs/common';
import { ManagerModule } from './manager/manager.module';
import { NotificationSettingsModule } from './notification-settings/notification-settings.module';

@Module({
  imports: [ManagerModule, NotificationSettingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
