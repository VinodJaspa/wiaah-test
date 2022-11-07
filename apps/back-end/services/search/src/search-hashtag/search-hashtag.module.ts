import { Module } from '@nestjs/common';
import { SearchHashtagResolver } from './search-hashtag.resolver';
import { SearchHashtagController } from './search-hashtag.controller';
import { SearchHashtagCommandHandlers } from './commands';
import { SearchHashtagElasticRepository } from './repository';
import { CqrsModule } from '@nestjs/cqrs';
import { SearchHashtagQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  providers: [
    SearchHashtagResolver,
    SearchHashtagElasticRepository,
    ...SearchHashtagCommandHandlers,
    ...SearchHashtagQueryHandlers,
  ],
  controllers: [SearchHashtagController],
})
export class SearchHashtagModule {}
