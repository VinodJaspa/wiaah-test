import { Module } from '@nestjs/common';
import { SiteProfitResolver } from './site-profit.resolver';

@Module({
  providers: [SiteProfitResolver],
})
export class SiteProfitModule {}
