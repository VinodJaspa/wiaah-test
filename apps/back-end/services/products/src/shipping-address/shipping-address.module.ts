import { Module } from '@nestjs/common';
import { ShippingAddressResolver } from './shipping-address.resolver';

@Module({
  providers: [ShippingAddressResolver],
})
export class ShippingAddressModule {}
