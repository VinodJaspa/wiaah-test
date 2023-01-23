import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { HashtagRepository } from '../../repository';
import { Hashtag } from '../../entities';
import { GetAllHashtagsQuery } from '../impl';

@QueryHandler(GetAllHashtagsQuery)
export class GetAllHashtagsQueryHandler
  implements IQueryHandler<GetAllHashtagsQuery>
{
  constructor(private readonly hashtagRepo: HashtagRepository) {}
  execute(query: GetAllHashtagsQuery): Promise<Hashtag[]> {
    return this.hashtagRepo.getTop(query.input.q, query.input.pagination);
  }
}
