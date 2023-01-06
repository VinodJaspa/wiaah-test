import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'prismaService';
import { AuthOtpResolver } from './auth-otp.resolver';
import { AuthOtpCommandHandlers } from './commands';
import { authOtpQueryHandlers } from './queries';
import { AuthOtpRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    PrismaService,
    AuthOtpResolver,
    AuthOtpRepository,
    ...authOtpQueryHandlers,
    ...AuthOtpCommandHandlers,
  ],
})
export class AuthOtpModule {}
