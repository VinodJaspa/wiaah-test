import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContentDiscoveryService } from '@content-discovery/content-discovery.service';
import { GetContentDataQuery } from '@content-discovery/queries/impl';

@QueryHandler(GetContentDataQuery)
export class GetContentDataQueryHandler
  implements IQueryHandler<GetContentDataQuery>
{
  constructor(private readonly service: ContentDiscoveryService) {}

  async execute({ id, type }: GetContentDataQuery): Promise<any> {
    return this.service.getContent(type as any, id);
  }
}
