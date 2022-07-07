import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import {
  KAFKA_BROKERS,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SellerOrdersService } from 'src/seller-orders/seller-orders.service';
import { BuyerOrdersService } from 'src/buyer-orders/buyer-orders.service';

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
