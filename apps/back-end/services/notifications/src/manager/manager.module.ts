import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerResolver } from './manager.resolver';
import { PrismaService } from 'prismaService';
import { ManagerController } from './manager.controller';
import { NotificationSettingsModule } from '@notification-settings';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    NotificationSettingsModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.NOTIFICATIONS.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.NOTIFICATIONS.clientId,
          },
          consumer: {
            groupId: SERVICES.NOTIFICATIONS.groupId,
          },
        },
      },
    ]),
  ],
  providers: [ManagerResolver, ManagerService, PrismaService],
  controllers: [ManagerController],
})
export class ManagerModule {}
