import { Module } from '@nestjs/common';
import { CashbackResolver } from './cashback.resolver';

@Module({
  providers: [CashbackResolver],
})
export class CashbackModule {}
