import { CommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SearchRepository } from '../../repository';
import { Localization } from '../../entities';
import { SearchPlacesCommand } from '../impl';

@CommandHandler(SearchPlacesCommand)
export class SearchPlacesQueryHandler
  implements IQueryHandler<SearchPlacesCommand>
{
  constructor(private readonly searchRepo: SearchRepository) {}

  execute({
    args: { langId, query, selectedFields },
  }: SearchPlacesCommand): Promise<Localization[]> {
    console.log('places command');
    return this.searchRepo.searchPropertiesByPlaceType(query, langId);
  }
}
