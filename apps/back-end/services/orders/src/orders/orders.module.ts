import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { OrdersController } from './orders.controller';
import { SellerOrdersService } from '../seller-orders/seller-orders.service';
import { BuyerOrdersService } from '../buyer-orders/buyer-orders.service';

import { OrdersRepository } from '@orders/repositoy';
import { OrdersCommandHandlers } from '@orders/commands';
import { OrdersQueryHandlers } from '@orders/queries';

@Module({
  imports: [
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
    OrdersService,
    PrismaService,
    SellerOrdersService,
    BuyerOrdersService,
    OrdersRepository,
    ...OrdersCommandHandlers,
    ...OrdersQueryHandlers,
  ],
  controllers: [OrdersController],
  exports: [ClientsModule, OrdersService, PrismaService],
})
export class OrdersModule {}
