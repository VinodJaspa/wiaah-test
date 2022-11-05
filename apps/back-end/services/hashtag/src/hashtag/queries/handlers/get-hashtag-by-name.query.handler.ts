import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { HashtagRepository } from '../../repository';
import { Hashtag } from '../../entities';
import { GetHashtagByNameCommand } from '../impl';

@QueryHandler(GetHashtagByNameCommand)
export class GetHashtagByNameQueryHandler
  implements IQueryHandler<GetHashtagByNameCommand>
{
  constructor(private readonly hashtagRepo: HashtagRepository) {}

  execute(query: GetHashtagByNameCommand): Promise<Hashtag> {
    return this.hashtagRepo.getHashtagByName(query.name);
  }
}
