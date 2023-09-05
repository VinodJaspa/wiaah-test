import { Module } from '@nestjs/common';
import { SellerSalesStatsResolver } from './seller-sales-stats.resolver';

@Module({
  providers: [SellerSalesStatsResolver],
})
export class SellerSalesStatsModule {}
