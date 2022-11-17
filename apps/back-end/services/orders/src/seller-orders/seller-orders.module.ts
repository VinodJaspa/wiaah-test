import { Module } from '@nestjs/common';
import { SellerOrdersService } from './seller-orders.service';
import { SellerOrdersResolver } from './seller-orders.resolver';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [OrdersModule],
  providers: [SellerOrdersResolver, SellerOrdersService],
})
export class SellerOrdersModule {}
