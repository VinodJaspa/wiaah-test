import { Module } from '@nestjs/common';
import { searchUsersCommandHandlers } from './commands';
import { SearchUserElasticRepository } from './repository';
import { SearchUsersResolver } from './search-users.resolver';
import { SearchUsersController } from './search-users.controller';
import { SearchUserQueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [
    SearchUsersResolver,
    SearchUserElasticRepository,
    ...searchUsersCommandHandlers,
    ...SearchUserQueryHandlers,
  ],
  controllers: [SearchUsersController],
})
export class SearchUsersModule {}
