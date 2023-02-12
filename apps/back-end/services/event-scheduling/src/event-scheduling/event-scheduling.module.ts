import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { EventSchedulingController } from './event-scheduling.controller';

@Module({
  imports: [
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
  providers: [],
  controllers: [EventSchedulingController],
})
export class EventSchedulingModule {}
