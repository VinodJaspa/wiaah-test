import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BeautyCenterRepository } from 'src/beauty-center/repository/beauty-center.repository';
import { BeautyCenter } from '../../entities';
import { SearchFilteredBeautyCenterQuery } from '../impl';

@QueryHandler(SearchFilteredBeautyCenterQuery)
export class SearchFilteredBeautyCenterQueryHandler
  implements IQueryHandler<SearchFilteredBeautyCenterQuery>
{
  constructor(private readonly beautyCenterRepo: BeautyCenterRepository) {}
  execute({
    input: { args, langId },
  }: SearchFilteredBeautyCenterQuery): Promise<BeautyCenter[]> {
    return this.beautyCenterRepo.searchFilteredBeautyCenter(args, langId);
  }
}
