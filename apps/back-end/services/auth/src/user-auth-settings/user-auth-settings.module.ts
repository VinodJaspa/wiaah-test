import { Module } from '@nestjs/common';
import { UserAuthSettingsResolver } from './user-auth-settings.resolver';
import { UserAuthSettingsController } from './user-auth-settings.controller';
import { UserAuthSettingsRepository } from './repository';
import { UserAuthSettingsCommandHandlers } from './commands';
import { UserAuthSettingQueryHandler } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'prismaService';

@Module({
  imports: [CqrsModule],
  providers: [
    PrismaService,
    UserAuthSettingsResolver,
    UserAuthSettingsRepository,
    ...UserAuthSettingsCommandHandlers,
    ...UserAuthSettingQueryHandler,
  ],
  controllers: [UserAuthSettingsController],
})
export class UserAuthSettingsModule {}
