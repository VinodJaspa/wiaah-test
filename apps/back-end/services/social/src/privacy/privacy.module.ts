import { Module } from '@nestjs/common';
import { PrivacyResolver } from './privacy.resolver';
import { PrivacyController } from './privacy.controller';
import { PrivacySettingsRepository } from './repository';
import { privacySettingsQueryHandlers } from './queries';
import { privacySettingsCommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [
    PrivacyResolver,
    PrivacySettingsRepository,
    ...privacySettingsQueryHandlers,
    ...privacySettingsCommandHandlers,
  ],
  controllers: [PrivacyController],
})
export class PrivacyModule {}
