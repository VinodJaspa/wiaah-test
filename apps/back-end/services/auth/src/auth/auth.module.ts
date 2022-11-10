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
import {
  getUserFromRequest,
  KAFKA_BROKERS,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthCommandHandlers } from './commands';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.AUTH_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.AUTH_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.AUTH_SERVICE.groupId,
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
  providers: [AuthResolver, AuthService, PrismaService, ...AuthCommandHandlers],
})
export class AuthModule {}
