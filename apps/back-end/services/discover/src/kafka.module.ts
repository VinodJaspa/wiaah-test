import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

export const kafkaModule = ClientsModule.register([
  {
    name: SERVICES.DISCOVER.token,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.DISCOVER.clientId,
      },
      consumer: {
        groupId: SERVICES.DISCOVER.groupId,
      },
    },
  },
]);
