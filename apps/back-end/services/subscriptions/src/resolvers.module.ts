import { Module } from '@nestjs/common';
import { ChatResolver } from './resolvers/chat.resolver';
import { KafkaPubsubModule, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.SUBSCRIPTIONS.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.SUBSCRIPTIONS.clientId,
          },
        },
      },
    ]),
    KafkaPubsubModule.register({
      brokers: KAFKA_BROKERS,
      clientId: 'subscriptions-client',
      topic: 'subscriptions-topic',
      groupIdPrefix: 'subscriptions',
    }),
  ],
  providers: [ChatResolver],
})
export class ResolversModule {}
