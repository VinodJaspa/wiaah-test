import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

export const KafkaModule = ClientsModule.register([
  {
    name: SERVICES.ANALYTICS_SERVICE.token,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.ANALYTICS_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.ANALYTICS_SERVICE.groupId,
      },
    },
  },
]);
