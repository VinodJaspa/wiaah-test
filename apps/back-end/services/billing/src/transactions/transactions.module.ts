import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { BalanceModule } from 'src/balance/balance.module';
import { transactionsQueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    BalanceModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.BILLING_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.BILLING_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.BILLING_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    TransactionsResolver,
    TransactionsService,
    PrismaService,
    ...transactionsQueryHandlers,
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
