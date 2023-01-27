import { Block } from '@block/entities';
import { BlockRepository } from '@block/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserBlocklistQuery } from '../impl';

@QueryHandler(GetUserBlocklistQuery)
export class GetUserBlocklistQueryHandler
  implements IQueryHandler<GetUserBlocklistQuery>
{
  constructor(private readonly repo: BlockRepository) {}

  execute({ user, input }: GetUserBlocklistQuery): Promise<Block[]> {
    return this.repo.getAllByBlockerId(user.id, input.pagination);
  }
}
