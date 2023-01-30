import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

import { OrdersResolver } from './orders.resolver';
import { OrdersController } from './orders.controller';

import { OrdersRepository } from '@orders/repositoy';
import { OrdersCommandHandlers } from '@orders/commands';
import { OrdersQueryHandlers } from '@orders/queries';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderItemResolver } from './order-item.resolver';

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
    OrdersResolver,
    PrismaService,
    OrdersRepository,
    OrderItemResolver,
    ...OrdersCommandHandlers,
    ...OrdersQueryHandlers,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
