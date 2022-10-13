import { Module } from '@nestjs/common';
import { MangerService } from './manager.service';
import { MangerResolver } from './manager.resolver';
import { PrismaService } from 'prismaService';
import { ManagerController } from './manager.controller';
import { NotificationSettingsModule } from '@notification-settings';

@Module({
  imports: [NotificationSettingsModule],
  providers: [MangerResolver, MangerService, PrismaService],
  controllers: [ManagerController],
})
export class ManagerModule {}
