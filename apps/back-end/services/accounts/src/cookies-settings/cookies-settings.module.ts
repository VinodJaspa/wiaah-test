import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CookiesSettingsResolver } from './cookies-settings.resolver';

@Module({
  imports: [CqrsModule],
  providers: [CookiesSettingsResolver],
})
export class CookiesSettingsModule {}
