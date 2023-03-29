import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RefundCommandHandlers } from '@refund/commands';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { RefundEventHandlers } from './events';
import { RefundQueryHandler } from './queries';
import { RefundAdminResolver } from './refund-admin.resolver';
import { RefundResolver } from './refund.resolver';
import { RefundRepository } from './repository';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.ORDERS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.ORDERS_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.ORDERS_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    RefundResolver,
    RefundAdminResolver,
    RefundRepository,
    ...RefundCommandHandlers,
    ...RefundQueryHandler,
    ...RefundEventHandlers,
  ],
})
export class RefundModule {}
