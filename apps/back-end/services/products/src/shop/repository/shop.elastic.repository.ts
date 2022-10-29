import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Location } from '../entities';
import { ShopElasticDocument } from '../models';

const SHOP_ELASTIC_SEARCH_INDEX = 'shop';

@Injectable()
export class ShopElasticRepository {
  constructor(private readonly elasticdb: ElasticsearchService) {}

  async indexShopDocument(id: string, location: Location) {
    await this.elasticdb.index<ShopElasticDocument>({
      index: SHOP_ELASTIC_SEARCH_INDEX,
      document: {
        ...location,
        dbId: id,
      },
    });
  }

  async searchShopsIdsByLocationQuery(query: string): Promise<string[]> {
    const res = await this.elasticdb.search<ShopElasticDocument>({
      index: SHOP_ELASTIC_SEARCH_INDEX,
      query: {
        multi_match: {
          query,
          fields: ['address', 'state', 'city', 'country'],
          fuzziness: 'AUTO',
        },
      },
    });

    return res.hits.hits.map((v) => v._source.dbId);
  }
}
