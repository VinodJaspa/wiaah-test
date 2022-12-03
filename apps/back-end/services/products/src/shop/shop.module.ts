import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

import { ShopService } from './shop.service';
import { ShopResolver } from './shop.resolver';
import { ShopController } from './shop.controller';
import { ShopEventHandlers } from './events';
import { ShopElasticRepository, ShopRepository } from './repository';
import { PrismaService } from 'prismaService';

@Module({
  imports: [
    CqrsModule,
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
  providers: [
    PrismaService,
    ShopResolver,
    ShopService,
    ShopElasticRepository,
    ShopRepository,
    ...ShopEventHandlers,
  ],
})
export class ShopModule {}
