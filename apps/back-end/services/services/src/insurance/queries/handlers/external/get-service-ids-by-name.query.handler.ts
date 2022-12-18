import { InsuranceBaseQueryHandler } from '@insurance/abstraction';
import {
  GetServiceIdsByNameQuery,
  GetServiceIdsByNameQueryRes,
} from '@insurance/queries/impl';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetServiceIdsByNameQuery)
export class GetServiceIdsByNameQueryHandler
  extends InsuranceBaseQueryHandler
  implements IQueryHandler<GetServiceIdsByNameQuery>
{
  async execute({
    name,
  }: GetServiceIdsByNameQuery): Promise<GetServiceIdsByNameQueryRes> {
    return [];
  }
}
