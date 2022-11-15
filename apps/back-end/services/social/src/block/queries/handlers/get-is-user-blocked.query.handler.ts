import { BlockRepository } from '@block/repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetIsUserBlockedQuery } from '@block/queries/impl';

@QueryHandler(GetIsUserBlockedQuery)
export class GetIsUserBlockedQueryHandler
  implements IQueryHandler<GetIsUserBlockedQuery>
{
  constructor(public readonly repo: BlockRepository) {}

  async execute({
    blockedUserId,
    blockerUserId,
  }: GetIsUserBlockedQuery): Promise<boolean> {
    const res = await this.repo.getBlockObj(blockerUserId, blockedUserId);
    if (!res) return false;

    return true;
  }
}
