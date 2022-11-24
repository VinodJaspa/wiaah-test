import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthOtpResolver } from './auth-otp.resolver';
import { AuthOtpCommandHandlers } from './commands';
import { authOtpQueryHandlers } from './queries';
import { AuthOtpRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    AuthOtpResolver,
    AuthOtpRepository,
    ...authOtpQueryHandlers,
    ...AuthOtpCommandHandlers,
  ],
})
export class AuthOtpModule {}
