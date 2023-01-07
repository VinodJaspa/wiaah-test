import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES, KAFKA_BROKERS } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AuthAdminResolver } from './auth-admin.resolver';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

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
  providers: [AuthAdminResolver, AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthAdminModule {}
