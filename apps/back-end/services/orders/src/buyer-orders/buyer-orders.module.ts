import { Module } from '@nestjs/common';
import { BuyerOrdersService } from './buyer-orders.service';
import { BuyerOrdersResolver } from './buyer-orders.resolver';

@Module({
  providers: [BuyerOrdersResolver, BuyerOrdersService],
})
export class BuyerOrdersModule {}
