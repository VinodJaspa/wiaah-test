import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchHashtagElasticModel } from '../models';

const SEARCH_HASHTAG_ELASTIS_SEARCH_INDEX =
  'search.hashtag.elastic.search.index';

@Injectable()
export class SearchHashtagElasticRepository {
  constructor(private readonly elasticService: ElasticsearchService) {}

  async indexHashtag(tag: SearchHashtagElasticModel): Promise<boolean> {
    const res = await this.elasticService.index<SearchHashtagElasticModel>({
      index: SEARCH_HASHTAG_ELASTIS_SEARCH_INDEX,
      document: tag,
    });
    return true;
  }

  async searchHashtags(query: string): Promise<string[]> {
    const res = await this.elasticService.search<SearchHashtagElasticModel>({
      index: SEARCH_HASHTAG_ELASTIS_SEARCH_INDEX,
      size: 10,
      query: {
        multi_match: {
          query,
          fields: ['name'],
          fuzziness: 'AUTO',
        },
      },
    });
    return res.hits.hits.map((v) => v._source.dbId);
  }
}
