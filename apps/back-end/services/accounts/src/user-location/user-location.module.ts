import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { UserLocationResolver } from './user-location.resolver';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.ACCOUNTS_SERVICE.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.ACCOUNTS_SERVICE.clientId,
          },
          consumer: {
            groupId: SERVICES.ACCOUNTS_SERVICE.groupId,
          },
        },
      },
    ]),
  ],
  providers: [UserLocationResolver],
})
export class UserLocationModule {}
