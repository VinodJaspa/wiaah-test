import { Module } from '@nestjs/common';
import { BillingAddressService } from './billing-address.service';
import { BillingAddressResolver } from './billing-address.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [BillingAddressResolver, BillingAddressService, PrismaService],
})
export class BillingAddressModule {}
