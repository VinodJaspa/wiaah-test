import { Module } from '@nestjs/common';
import { BuyerOrdersService } from './buyer-orders.service';
import { BuyerOrdersResolver } from './buyer-orders.resolver';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  providers: [BuyerOrdersResolver, BuyerOrdersService],
})
export class BuyerOrdersModule {}
