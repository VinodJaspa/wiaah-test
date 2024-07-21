import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

export const kafkaModule = ClientsModule.register([
  {
    name: SERVICES.SOCIAL_SERVICE.token,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.SOCIAL_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.SOCIAL_SERVICE.groupId,
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner, // Add this line to use the legacy partitioner
      },
    },
  },
]);
