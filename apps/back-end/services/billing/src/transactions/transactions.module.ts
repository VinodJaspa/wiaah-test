import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { BalanceModule } from 'src/balance/balance.module';

@Module({
  imports: [BalanceModule],
  providers: [TransactionsResolver, TransactionsService, PrismaService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
