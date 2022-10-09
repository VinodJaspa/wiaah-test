import { Module } from '@nestjs/common';
import { ShippingDetailsService } from './shipping-details.service';
import { ShippingDetailsResolver } from './shipping-details.resolver';
import { ShippingRulesService } from '@shipping-rules';
import { PrismaService } from 'prismaService';

@Module({
  providers: [
    ShippingDetailsResolver,
    ShippingDetailsService,
    ShippingRulesService,
    PrismaService,
  ],
})
export class ShippingDetailsModule {}
