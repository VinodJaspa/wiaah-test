import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HealthCenter } from 'src/health-center/entities';
import { HealthCenterRepository } from '../../repository';
import { SearchHealthCenterQuery } from '../impl/search-health-centers.query';

@QueryHandler(SearchHealthCenterQuery)
export class SearchHealthCenterQueryHandler
  implements IQueryHandler<SearchHealthCenterQuery>
{
  constructor(private readonly healthCenterRepo: HealthCenterRepository) {}
  async execute({
    input: { input, langId, selectedFields },
  }: SearchHealthCenterQuery): Promise<HealthCenter[]> {
    const res = await this.healthCenterRepo.searchFilteredHealthCenters(
      input,
      selectedFields,
      langId,
    );
    return res;
  }
}
