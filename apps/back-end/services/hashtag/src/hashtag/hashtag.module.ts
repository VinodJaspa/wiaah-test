import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HashtagCommandHandlers } from './commands';
import { HashtagResolver } from './hashtag.resolver';
import { HashtagQueryHandlers } from './queries';
import { HashtagRepository } from './repository';
import { HashtagController } from './hashtag.controller';
import { HashtagSaga } from './sagas';

@Module({
  imports: [CqrsModule],
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
