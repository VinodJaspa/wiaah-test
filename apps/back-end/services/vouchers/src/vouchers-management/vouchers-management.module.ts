import { Module } from '@nestjs/common';
import { VouchersManagementService } from './vouchers-management.service';
import { VouchersManagementResolver } from './vouchers-management.resolver';
import { PrismaService } from 'src/prisma.service';
import { VouchersManagementController } from './vouchers-management.controller';

@Module({
  imports: [],
  providers: [
    VouchersManagementResolver,
    VouchersManagementService,
    PrismaService,
  ],
  controllers: [VouchersManagementController],
})
export class VouchersManagementModule {}
