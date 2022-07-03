import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TransactionsResolver, TransactionsService, PrismaService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
