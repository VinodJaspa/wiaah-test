import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ELASTIC_INDICES } from 'nest-utils';
import { SearchElasticRepository } from '../../repository';

import { Localization } from '../../entities';
import { SearchLocalizationCommand } from '../impl';

@CommandHandler(SearchLocalizationCommand)
export class SearchLocalizationCommandHandler
  implements ICommandHandler<SearchLocalizationCommand>
{
  constructor(private readonly elasticRepo: SearchElasticRepository) {}

  async execute({
    args: { query, langId, selectedFields, userId },
  }: SearchLocalizationCommand): Promise<Localization[]> {
    const ids = await this.elasticRepo.getPropertiesIdsAndTypes(query);

    for (const id of ids) {
    }
    return [];
  }
}
