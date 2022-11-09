import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { idCommandHandlers } from './commands';
import { IdentityVerificationResolver } from './identity-verification.resolver';
import { IdentityVerificationRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    IdentityVerificationResolver,
    IdentityVerificationRepository,
    ...idCommandHandlers,
  ],
})
export class IdentityVerificationModule {}
