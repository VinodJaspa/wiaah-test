import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchHashtag } from '../../entities';
import { SearchHashtagElasticRepository } from '../../repository';
import { SearchHashtagQuery } from '../impl';

@QueryHandler(SearchHashtagQuery)
export class SearchHashtagQueryHandler
  implements IQueryHandler<SearchHashtagQuery>
{
  constructor(private readonly elasticRepo: SearchHashtagElasticRepository) {}

  async execute({ query }: SearchHashtagQuery): Promise<SearchHashtag> {
    const res = await this.elasticRepo.searchHashtags(query);
    return {
      ids: res,
    };
  }
}
