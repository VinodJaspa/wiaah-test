import { Module } from '@nestjs/common';
import { TaxRateResolver } from './tax-rate.resolver';

@Module({
  providers: [TaxRateResolver],
})
export class TaxRateModule {}
