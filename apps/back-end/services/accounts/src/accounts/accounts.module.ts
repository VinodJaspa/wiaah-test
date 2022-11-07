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
import { getUserFromRequest, KAFKA_BROKERS, SERVICES } from 'nest-utils';
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
        name: SERVICES.ACCOUNTS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.ACCOUNTS_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.ACCOUNTS_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [AccountsResolver, AccountsService, PrismaService],
  controllers: [AccountsController],
})
export class AccountsModule {}
