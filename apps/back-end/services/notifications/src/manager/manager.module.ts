import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerResolver } from './manager.resolver';
import { PrismaService } from 'prismaService';
import { ManagerController } from './manager.controller';
import { NotificationSettingsModule } from '@notification-settings';

@Module({
  imports: [NotificationSettingsModule],
  providers: [ManagerResolver, ManagerService, PrismaService],
  controllers: [ManagerController],
})
export class ManagerModule {}
