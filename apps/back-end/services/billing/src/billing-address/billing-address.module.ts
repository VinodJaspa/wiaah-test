import { Module } from '@nestjs/common';
import { BillingAddressService } from './billing-address.service';
import { BillingAddressResolver } from './billing-address.resolver';
import { PrismaService } from 'prismaService';

@Module({
  providers: [BillingAddressResolver, BillingAddressService, PrismaService],
  exports: [BillingAddressService],
})
export class BillingAddressModule {}
