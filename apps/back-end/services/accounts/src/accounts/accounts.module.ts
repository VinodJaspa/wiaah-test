import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { PrismaService } from 'src/prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AccountsController } from './accounts.controller';
import {
  getUserFromRequest,
  KAFKA_BROKERS,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
    ClientsModule.register([
      {
        name: SERVICES.WISHLIST_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.WISHLIST_SERVICE.clientId,
            brokers: KAFKA_BROKERS,
          },
          consumer: {
            groupId: SERVICES.WISHLIST_SERVICE.groupId,
          },
        },
      },
      {
        name: SERVICES.SHOPPING_CART_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.SHOPPING_CART_SERVICE.clientId,
            brokers: KAFKA_BROKERS,
          },
          consumer: {
            groupId: SERVICES.SHOPPING_CART_SERVICE.groupId,
          },
        },
      },
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
  providers: [AccountsResolver, AccountsService, PrismaService],
  controllers: [AccountsController],
})
export class AccountsModule {}
