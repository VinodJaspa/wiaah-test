import { InsuranceBaseQueryHandler } from '@insurance/abstraction';
import {
  GetServiceDataQuery,
  GetServiceDataQueryRes,
} from '@insurance/queries/impl';
import {
  GetServiceQuery,
  GetServiceQueryRes,
} from '@service-discovery/queries';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetServiceDataQuery)
export class GetServiceDataQueryHandler
  extends InsuranceBaseQueryHandler
  implements IQueryHandler<GetServiceDataQuery>
{
  async execute({
    id,
    type,
  }: GetServiceDataQuery): Promise<GetServiceDataQueryRes> {
    const res = await this.querybus.execute<
      GetServiceQuery,
      GetServiceQueryRes
    >(new GetServiceQuery(id, type));

    return res;
  }
}
