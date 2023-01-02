import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { FriendsResolver } from './friends.resolver';

@Module({
  imports: [
    ClientsModule.register([
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
    ]),
  ],
  providers: [FriendsResolver],
})
export class FriendsModule {}
