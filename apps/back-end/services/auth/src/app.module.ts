import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserAuthSettingsModule } from './user-auth-settings/user-auth-settings.module';
import { AuthOtpModule } from './auth-otp/auth-otp.module';
import { AuthAdminModule } from '@auth/auth-admin.module';

@Module({
  imports: [AuthModule, UserAuthSettingsModule, AuthOtpModule, AuthAdminModule],
})
export class AppModule {}
