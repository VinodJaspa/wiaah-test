import { QueryHandlerBase } from '../../../abstraction/QueryHandlerBase';
import {
  GetCommentHostDataQuery,
  GetCommentHostDataQueryRes,
} from '@comments/queries/impl';
import { GetContentDataQuery } from '@content-discovery/queries';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetCommentHostDataQuery)
export class GetCommentHostDataQueryHandler
  extends QueryHandlerBase
  implements IQueryHandler<GetCommentHostDataQuery>
{
  async execute({
    id,
    type,
  }: GetCommentHostDataQuery): Promise<GetCommentHostDataQueryRes> {
    const res = await this.querybus.execute(new GetContentDataQuery(id, type));
    return {
      authorId: res.userId,
      id: res.id,
      type,
    };
  }
}
