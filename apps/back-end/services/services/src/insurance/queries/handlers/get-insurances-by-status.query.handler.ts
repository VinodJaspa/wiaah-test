import { InsuranceBaseQueryHandler } from '@insurance/abstraction';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetInsurancesByStatusQuery,
  GetInsurancesByStatusQueryRes,
} from '../impl';

@QueryHandler(GetInsurancesByStatusQuery)
export class GetInsurancesByStatusQueryHandler
  extends InsuranceBaseQueryHandler
  implements IQueryHandler<GetInsurancesByStatusQuery>
{
  async execute({
    pagination,
    status,
  }: GetInsurancesByStatusQuery): Promise<GetInsurancesByStatusQueryRes> {
    const res = await this.repo.getAllByStatus(pagination, status);
    return res;
  }
}
