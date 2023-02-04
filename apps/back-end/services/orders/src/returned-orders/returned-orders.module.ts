import { Module } from '@nestjs/common';
import { ReturnedOrdersResolver } from './returned-orders.resolver';

@Module({
  providers: [ReturnedOrdersResolver],
})
export class ReturnedOrdersModule {}
