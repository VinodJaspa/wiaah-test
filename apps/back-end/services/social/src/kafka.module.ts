import { ClientsModule, Transport } from '@nestjs/microservices';
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
    },
  },
]);
