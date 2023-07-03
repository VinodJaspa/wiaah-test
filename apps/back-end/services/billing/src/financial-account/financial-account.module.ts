import { Module } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { FinancialAccountResolver } from './financial-account.resolver';
import { FinancialAccountEventHandlers } from './events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        transport: Transport.KAFKA,
        name: SERVICES.BILLING_SERVICE.token,
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
    FinancialAccountResolver,
    PrismaService,
    ...FinancialAccountEventHandlers,
  ],
})
export class FinancialAccountModule {}
