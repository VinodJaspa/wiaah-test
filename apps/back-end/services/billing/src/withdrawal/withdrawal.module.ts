import { Module } from '@nestjs/common';
import { WithdrawalResolver } from './withdrawal.resolver';

@Module({
  providers: [WithdrawalResolver],
})
export class WithdrawalModule {}
