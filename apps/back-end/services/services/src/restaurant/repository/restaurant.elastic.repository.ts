import { ServiceLocation } from '@entities';
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RestaurantElasticDocument } from '../models';

const RESTAURANT_ELASTIC_SEARCH_INDEX = 'restaurant';

@Injectable()
export class RestaurantElasticSearchRepository {
  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  logger = new Logger('RestaurantElasticSearchRepository');

  async createRestaurantIndex(input: {
    restaurantId: string;
    location: ServiceLocation;
  }): Promise<void> {
    try {
      await this.elasticSearchService.index({
        index: RESTAURANT_ELASTIC_SEARCH_INDEX,
        document: {
          mongoId: input.restaurantId,
          ...input.location,
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getRestaurantIdsByLocationQuery(query: string): Promise<string[]> {
    try {
      const res =
        await this.elasticSearchService.search<RestaurantElasticDocument>({
          query: {
            multi_match: {
              query,
              fields: [
                'address',
                'city',
                'country',
                'state',
                'postalCode',
              ] as (keyof ServiceLocation)[],
            },
          },
        });

      return res.hits.hits.map((v) => v._source.mongoId);
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }
}
