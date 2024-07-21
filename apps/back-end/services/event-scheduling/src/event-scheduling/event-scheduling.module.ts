import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from '@prisma-service';
import { KafkaPubsubModule, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { PrismaModule } from 'src/prisma.module';
import { EventSchedulingController } from './event-scheduling.controller';

@Module({
  imports: [
    PrismaModule,
    KafkaPubsubModule,
    ClientsModule.register([
      {
        name: SERVICES.EVENT_SCHEDULING.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.EVENT_SCHEDULING.clientId,
          },
          consumer: {
            groupId: SERVICES.EVENT_SCHEDULING.groupId,
          },
        },
      },
    ]),
  ],
  providers: [PrismaService],
  controllers: [EventSchedulingController],
})
export class EventSchedulingModule { }
