import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';

export const kafkaModule = ClientsModule.register([
  {
    transport: Transport.KAFKA,
    name: SERVICES.SERVICES_SERIVCE.token,
  },
]);
