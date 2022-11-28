import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserActionsQuery } from '@action/queries';
import { Action } from '@action/entities';
import { ActionRepository } from '@action/repository';

@QueryHandler(GetUserActionsQuery)
export class GetUserActionsQueryHandler
  implements IQueryHandler<GetUserActionsQuery>
{
  constructor(private readonly repo: ActionRepository) {}

  async execute({
    userId,
    pagination,
  }: GetUserActionsQuery): Promise<Action[]> {
    const res = await this.repo.getAllByUserId(userId, pagination);

    return res;
  }
}
