import { Module } from '@nestjs/common';
import { ChatResolver } from './resolvers/chat.resolver';
import { KafkaPubsubModule, KAFKA_BROKERS } from 'nest-utils';

@Module({
  imports: [
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
