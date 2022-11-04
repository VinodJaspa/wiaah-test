import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaPubsubModule, KAFKA_BROKERS, SERVICES } from 'nest-utils';

import { MessageCommandsHandlers } from './commands';
import { MessageEventHandlers } from './events';
import { MessageResolver } from './message.resolver';
import { MessagesRepository } from './repository';
import { ChatMessageSagas } from './saga';

@Module({
  imports: [
    CqrsModule,
    KafkaPubsubModule.register({
      brokers: KAFKA_BROKERS,
      clientId: SERVICES.CHAT.clientId,
      groupIdPrefix: SERVICES.CHAT.groupId,
      topic: SERVICES.CHAT.pubsubTopic,
    }),
    ClientsModule.register([
      {
        name: SERVICES.CHAT.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.CHAT.clientId,
          },
          consumer: {
            groupId: SERVICES.CHAT.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    MessageResolver,
    MessagesRepository,
    ...MessageCommandsHandlers,
    ...MessageEventHandlers,
    ...ChatMessageSagas,
  ],
})
export class MessageModule {}
