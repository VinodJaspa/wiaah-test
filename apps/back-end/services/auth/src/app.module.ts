import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserAuthSettingsModule } from './user-auth-settings/user-auth-settings.module';
import { AuthOtpModule } from './auth-otp/auth-otp.module';

@Module({
  imports: [AuthModule, UserAuthSettingsModule, AuthOtpModule],
})
export class AppModule {}
