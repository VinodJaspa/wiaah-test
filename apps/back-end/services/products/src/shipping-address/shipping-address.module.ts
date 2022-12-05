import { Module } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { ShippingAddressResolver } from './shipping-address.resolver';

@Module({
  providers: [ShippingAddressResolver, ShippingAddressService]
})
export class ShippingAddressModule {}
