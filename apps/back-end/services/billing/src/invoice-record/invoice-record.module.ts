import { Module } from '@nestjs/common';
import { InvoiceRecordService } from './invoice-record.service';
import { InvoiceRecordResolver } from './invoice-record.resolver';

@Module({
  providers: [InvoiceRecordResolver, InvoiceRecordService]
})
export class InvoiceRecordModule {}
