import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { BalanceModule } from 'src/balance/balance.module';
import { transactionsQueryHandlers } from './queries';

@Module({
  imports: [BalanceModule],
  providers: [
    TransactionsResolver,
    TransactionsService,
    PrismaService,
    ...transactionsQueryHandlers,
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
