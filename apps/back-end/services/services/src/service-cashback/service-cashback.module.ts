import { Module } from '@nestjs/common';
import { ServiceCashbackResolver } from './service-cashback.resolver';

@Module({
  providers: [ServiceCashbackResolver],
})
export class ServiceCashbackModule {}
