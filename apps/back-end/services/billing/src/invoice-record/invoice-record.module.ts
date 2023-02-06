import { Module } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { InvoiceRecordResolver } from './invoice-record.resolver';

@Module({
  providers: [InvoiceRecordResolver, PrismaService],
})
export class InvoiceRecordModule {}
