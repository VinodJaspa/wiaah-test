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
import { getUserFromRequest } from 'nest-utils';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ACCOUNTS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'account',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: ACCOUNTS_SERVICE.groupId,
          },
        },
      },
      {
        name: MAILING_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'mailing',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: MAILING_SERVICE.groupId,
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
