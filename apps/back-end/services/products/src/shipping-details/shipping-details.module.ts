import { Module } from '@nestjs/common';
import { ShippingDetailsService } from './shipping-details.service';
import { PrismaService } from 'prismaService';
import { ShippingDetailsResolver } from './shipping-details.resolver';

@Module({
  providers: [ShippingDetailsService, PrismaService, ShippingDetailsResolver],
})
export class ShippingDetailsModule {}
