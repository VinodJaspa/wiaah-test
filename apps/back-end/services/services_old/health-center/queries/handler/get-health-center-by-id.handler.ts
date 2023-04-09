import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { HealthCenterRepository } from '../../repository';
import { HealthCenter } from '../../entities';
import { GetHealthCenterByIdQuery } from '../impl';

@QueryHandler(GetHealthCenterByIdQuery)
export class GetHealthCenterByIdQueryHandler
  implements IQueryHandler<GetHealthCenterByIdQuery>
{
  constructor(private readonly healthCenterRepo: HealthCenterRepository) {}

  execute({
    args: { id, langId, selectedFields, userId },
  }: GetHealthCenterByIdQuery): Promise<HealthCenter> {
    return this.healthCenterRepo.getHealthCenterbyId(id, userId, langId);
  }
}
