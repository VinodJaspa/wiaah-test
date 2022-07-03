import { Module } from '@nestjs/common';
import { VouchersManagementService } from './vouchers-management.service';
import { VouchersManagementResolver } from './vouchers-management.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  providers: [
    VouchersManagementResolver,
    VouchersManagementService,
    PrismaService,
  ],
})
export class VouchersManagementModule {}
