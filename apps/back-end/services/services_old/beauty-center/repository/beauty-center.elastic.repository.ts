import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { BeautyCenterElasticDoucment } from '../models';

const BEAUTY_CENTER_ELASTIC_SEARCH_INDEX = 'beauty-center-search';

@Injectable()
export class BeautyCenterElasticRepository {
  constructor(private readonly elasticService: ElasticsearchService) {}

  async indexBeautyCenterDocument(
    input: BeautyCenterElasticDoucment,
  ): Promise<void> {
    await this.elasticService.index({
      index: BEAUTY_CENTER_ELASTIC_SEARCH_INDEX,
      refresh: true,
      document: input,
    });
  }

  async searchBeautyCenterIds(query: string): Promise<string[]> {
    const res = await this.elasticService.search<BeautyCenterElasticDoucment>({
      index: BEAUTY_CENTER_ELASTIC_SEARCH_INDEX,
      query: {
        multi_match: {
          query,
          fields: ['address', 'city', 'state', 'country'],
          type: 'bool_prefix',
          fuzziness: 'AUTO',
        },
      },
    });

    return res.hits.hits.map((v) => v._source.dbId);
  }
}
