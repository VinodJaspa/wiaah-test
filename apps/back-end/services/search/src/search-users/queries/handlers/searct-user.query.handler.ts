import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchUserElasticRepository } from '../../repository';
import { SearchUsers } from '../../entities';
import { SearchUserQuery } from '../impl';

@QueryHandler(SearchUserQuery)
export class SearchUserQueryHandler implements IQueryHandler<SearchUserQuery> {
  constructor(private readonly elastic: SearchUserElasticRepository) {}

  async execute(query: string): Promise<SearchUsers> {
    const ids = await this.elastic.searchUsersIds(query);
    return {
      usersIds: ids,
    };
  }
}
