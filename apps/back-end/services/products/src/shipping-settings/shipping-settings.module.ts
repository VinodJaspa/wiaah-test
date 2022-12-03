import { Module } from '@nestjs/common';
import { ShippingSettingsService } from './shipping-settings.service';
import { ShippingSettingsResolver } from './shipping-settings.resolver';
import { PrismaService } from 'src/prisma.service';
import { ShippingSettingsController } from './shipping-settings.controller';

import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.SHIPPING_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.SHIPPING_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.SHIPPING_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [ShippingSettingsResolver, ShippingSettingsService, PrismaService],
  controllers: [ShippingSettingsController],
})
export class ShippingSettingsModule {}
