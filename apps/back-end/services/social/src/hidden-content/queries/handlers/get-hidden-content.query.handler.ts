import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHiddenContentQuery } from '@hidden-content/queries';
import { HiddenContentRepository } from '@hidden-content/repository';
import { HiddenContent } from '@hidden-content/entities';

@QueryHandler(GetHiddenContentQuery)
export class GetHiddenContentQueryHandler
  implements IQueryHandler<GetHiddenContentQuery>
{
  constructor(private readonly repo: HiddenContentRepository) {}

  async execute({ id }: GetHiddenContentQuery): Promise<HiddenContent> {
    const res = await this.repo.getOne(id);
    return res;
  }
}
