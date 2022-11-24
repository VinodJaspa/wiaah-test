import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetActionByIdQuery } from '@action/queries/impl';
import { Action } from '@action/entities';
import { ActionRepository } from '@action/repository';

@QueryHandler(GetActionByIdQuery)
export class GetActionByIdQueryHandler
  implements IQueryHandler<GetActionByIdQuery>
{
  constructor(private readonly repo: ActionRepository) {}
  async execute({ id }: GetActionByIdQuery): Promise<Action> {
    const res = await this.repo.getOneById(id);
    return res;
  }
}
