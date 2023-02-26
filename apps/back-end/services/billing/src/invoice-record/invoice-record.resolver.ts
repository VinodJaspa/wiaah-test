import { Args, Query, Resolver } from '@nestjs/graphql';
import { InvoiceRecordTypes } from '@prisma-client';
import { PrismaService } from 'prismaService';
import { InvoiceRecord } from './entities/invoice-record.entity';

@Resolver(() => InvoiceRecord)
export class InvoiceRecordResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => InvoiceRecord)
  getInvoiceRecord(@Args('period') period: InvoiceRecordTypes) {
    return this.getPeriod(period);
  }

  async getPeriod(type: InvoiceRecordTypes) {
    let record: InvoiceRecord;
    const period = this.createPeriod(type);

    record = await this.prisma.invoiceRecord.findFirst({
      where: {
        period,
      },
    });

    if (!record)
      record = await this.prisma.invoiceRecord.create({
        data: { period, type },
      });

    return record;
  }

  createPeriod(type: InvoiceRecordTypes) {
    switch (type) {
      case InvoiceRecordTypes.day:
        return new Date().toLocaleDateString('en-us', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        });
      case InvoiceRecordTypes.month:
        return new Date().toLocaleDateString('en-us', {
          year: '2-digit',
          month: '2-digit',
        });

      case InvoiceRecordTypes.year:
        return new Date().toLocaleDateString('en-us', {
          year: '2-digit',
        });
    }
  }
}
