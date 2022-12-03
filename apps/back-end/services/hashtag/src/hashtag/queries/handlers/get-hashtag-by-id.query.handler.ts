import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Hashtag } from '../../entities';
import { HashtagRepository } from '../../repository';
import { GetHashtagByIdCommand } from '../impl';

@QueryHandler(GetHashtagByIdCommand)
export class GetHashTagBuIdCommandHandler
  implements IQueryHandler<GetHashtagByIdCommand>
{
  constructor(private readonly HashtagRepo: HashtagRepository) {}

  execute({ id }: GetHashtagByIdCommand): Promise<Hashtag> {
    return this.HashtagRepo.getHashtagById(id);
  }
}
