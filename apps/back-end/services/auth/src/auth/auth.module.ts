import { Module } from '@nestjs/common';
import {
  ApolloFederationDriverConfig,
  ApolloFederationDriver,
} from '@nestjs/apollo';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthCommandHandlers } from './commands';
import { AuthRepository } from './repository';
import { authQueryHandlers } from './queries';
import { authEventHandlers } from './events';
import { AuthAdminModule } from './auth-admin.module';

@Module({
  imports: [
    CqrsModule,
    AuthAdminModule,
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
  providers: [
    AuthResolver,
    AuthService,
    PrismaService,
    AuthRepository,
    ...AuthCommandHandlers,
    ...authQueryHandlers,
    ...authEventHandlers,
  ],
})
export class AuthModule {}
