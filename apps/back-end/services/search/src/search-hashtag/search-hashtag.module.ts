import { Module } from '@nestjs/common';
import { SearchHashtagResolver } from './search-hashtag.resolver';
import { SearchHashtagController } from './search-hashtag.controller';
import { SearchHashtagCommandHandlers } from './commands';
import { SearchHashtagElasticRepository } from './repository';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [
    SearchHashtagResolver,
    SearchHashtagElasticRepository,
    ...SearchHashtagCommandHandlers,
    ...SearchHashtagCommandHandlers,
  ],
  controllers: [SearchHashtagController],
})
export class SearchHashtagModule {}
