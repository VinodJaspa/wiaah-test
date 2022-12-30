import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { WithdrawalEventHandlers } from './events';
import { WithdrawalResolver } from './withdrawal.resolver';

@Module({
  imports: [CqrsModule],
  providers: [WithdrawalResolver, ...WithdrawalEventHandlers],
})
export class WithdrawalModule {}
