import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopResolver } from './shop.resolver';
import { PrismaService } from 'prismaService';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ShopController } from './shop.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.SHOP_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.SHOP_SERVICE.clientId,
            brokers: KAFKA_BROKERS,
          },
          consumer: {
            groupId: SERVICES.SHOP_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  controllers: [ShopController],
  providers: [ShopResolver, ShopService, PrismaService],
})
export class ShopModule {}
