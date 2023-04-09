import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { HealthCenterElasticDocument } from '../models';

const HEALTH_CENTER_ELASTIC_SEARCH_INDEX = 'health-center';

@Injectable()
export class HealthCenterElasticRepository {
  constructor(private readonly elasticSearch: ElasticsearchService) {}

  async createHealthCenterIndex(input: HealthCenterElasticDocument) {
    const res = await this.elasticSearch.index({
      index: HEALTH_CENTER_ELASTIC_SEARCH_INDEX,
    });
  }

  async getHealthCentersIds(query: string) {
    const res = await this.elasticSearch.search<HealthCenterElasticDocument>({
      index: HEALTH_CENTER_ELASTIC_SEARCH_INDEX,
      query: {
        multi_match: {
          query,
          fields: ['address', 'state', 'country', 'city'],
          type: 'bool_prefix',
        },
      },
    });

    return res.hits.hits.map((v) => v._source.dbId);
  }
}
