import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'prismaService';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SellerOrdersService } from '../seller-orders/seller-orders.service';
import { BuyerOrdersService } from '../buyer-orders/buyer-orders.service';

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
  ],
  controllers: [OrdersController],
  exports: [ClientsModule, OrdersService, PrismaService],
})
export class OrdersModule {}
