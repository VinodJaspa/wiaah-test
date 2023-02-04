import { Module } from '@nestjs/common';
import { ServiceDiscountResolver } from './service-discount.resolver';

@Module({
  providers: [ServiceDiscountResolver],
})
export class ServiceDiscountModule {}
