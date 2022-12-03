import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SearchRepository } from '../../repository';
import { Localization } from '../../entities';
import { SearchLocalizationCommand } from '../impl';

@CommandHandler(SearchLocalizationCommand)
export class SearchLocalizationCommandHandler
  implements ICommandHandler<SearchLocalizationCommand>
{
  constructor(private readonly searchRepo: SearchRepository) {}

  async execute({
    args: { query, langId, selectedFields, userId },
  }: SearchLocalizationCommand): Promise<Localization[]> {
    return this.searchRepo.getLocalizationsBySearchQuery(query, langId);
  }
}
