import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountVerificationResolver } from './account-verification.resolver';
import { accVerificationCommandHandlers } from './commands';
import { accVerificationQueryHandlers } from './queries';
import { AccountVerificationRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    AccountVerificationResolver,
    AccountVerificationRepository,
    ...accVerificationCommandHandlers,
    ...accVerificationQueryHandlers,
  ],
})
export class AccountVerificationModule {}
