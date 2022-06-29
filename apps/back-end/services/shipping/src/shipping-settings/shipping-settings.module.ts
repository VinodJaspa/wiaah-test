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
} from 'nest-utils';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req, user: getUserFromRequest }),
    }),
    ClientsModule.register([
      {
        name: KAFKA_SERVICE_TOKEN,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: KAFKA_SERVICE_CLIENTID,
          },
          consumer: {
            groupId: KAFKA_SERVICE_GROUPID,
          },
        },
      },
    ]),
  ],
  providers: [ShippingSettingsResolver, ShippingSettingsService, PrismaService],
  controllers: [ShippingSettingsController],
  exports: [PrismaService, ShippingSettingsService, ClientsModule],
})
export class ShippingSettingsModule {}
