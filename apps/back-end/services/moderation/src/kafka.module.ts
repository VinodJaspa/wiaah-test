import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

export const KafkaModule = ClientsModule.register([
  {
    name: SERVICES.MODERATION.token,
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.MODERATION.clientId,
      },
      consumer: {
        groupId: SERVICES.MODERATION.groupId,
      },
    },
  },
]);
