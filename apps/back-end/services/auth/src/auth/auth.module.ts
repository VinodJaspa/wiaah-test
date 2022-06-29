import { Module } from '@nestjs/common';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ACCOUNTS_SERVICE, MAILING_SERVICE } from 'src/ServicesTokens';
import {
  getUserFromRequest,
  KAFKA_BROKERS,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.ACCOUNTS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.ACCOUNTS_SERVICE.clientId,
            brokers: KAFKA_BROKERS,
          },
          consumer: {
            groupId: SERVICES.ACCOUNTS_SERVICE.groupId,
          },
        },
      },
      {
        name: SERVICES.MAILING_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: SERVICES.MAILING_SERVICE.clientId,
            brokers: KAFKA_BROKERS,
          },
          consumer: {
            groupId: SERVICES.MAILING_SERVICE.groupId,
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
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [AuthResolver, AuthService, PrismaService],
})
export class AuthModule {}
