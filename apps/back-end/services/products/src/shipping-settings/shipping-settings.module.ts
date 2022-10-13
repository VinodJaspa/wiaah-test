import { Module } from '@nestjs/common';
import { ShippingSettingsService } from './shipping-settings.service';
import { ShippingSettingsResolver } from './shipping-settings.resolver';
import { PrismaService } from 'src/prisma.service';
import { ShippingSettingsController } from './shipping-settings.controller';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import {
  getUserFromRequest,
  KAFKA_BROKERS,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

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
  exports: [ShippingSettingsService],
})
export class ShippingSettingsModule {}
