import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HashtagCommandHandlers } from './commands';
import { HashtagResolver } from './hashtag.resolver';
import { HashtagQueryHandlers } from './queries';
import { HashtagRepository } from './repository';
import { HashtagController } from './hashtag.controller';
import { HashtagSaga } from './sagas';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICES.HASHTAG.token,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: KAFKA_BROKERS,
            clientId: SERVICES.HASHTAG.clientId,
          },
          consumer: {
            groupId: SERVICES.HASHTAG.groupId,
          },
        },
      },
    ]),
  ],
  providers: [
    HashtagResolver,
    HashtagRepository,
    HashtagSaga,
    ...HashtagCommandHandlers,
    ...HashtagQueryHandlers,
  ],
  controllers: [HashtagController],
})
export class HashtagModule {}
