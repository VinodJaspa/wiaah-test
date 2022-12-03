import { Module } from '@nestjs/common';
import { ShippingDetailsService } from './shipping-details.service';
import { PrismaService } from 'prismaService';

@Module({
  providers: [ShippingDetailsService, PrismaService],
})
export class ShippingDetailsModule {}
