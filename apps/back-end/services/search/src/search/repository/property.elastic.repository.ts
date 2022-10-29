import { Injectable } from '@nestjs/common';
import { ELASTIC_INDICES } from 'nest-utils';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { z } from 'zod';

import { Localization } from '../entities';

const schema = z
  .object({
    dbId: z.string(),
    type: z.string(),
  })
  .required();

type SchemaType = z.infer<typeof schema>;

@Injectable()
export class SearchElasticRepository {
  constructor(private readonly elasticService: ElasticsearchService) {}

  async getPropertiesIdsAndTypes(query: string): Promise<SchemaType[]> {
    const {
      BEAUTY_CENTER_LOCATION_INDEX,
      HEALTH_CENTER_LOCATION_INDEX,
      HOTEL_LOCATION_INDEX,
      RESTAURANT_LOCATION_INDEX,
      SHOP_LOCATION_INDEX,
      VEHICLE_LOCATION_INDEX,
    } = ELASTIC_INDICES;

    const res = await this.elasticService.search<SchemaType>({
      index: [
        BEAUTY_CENTER_LOCATION_INDEX,
        HEALTH_CENTER_LOCATION_INDEX,
        HOTEL_LOCATION_INDEX,
        RESTAURANT_LOCATION_INDEX,
        SHOP_LOCATION_INDEX,
        VEHICLE_LOCATION_INDEX,
      ],
      query: {
        multi_match: {
          query,
          fuzziness: 'AUTO',
          fields: ['address', 'city', 'country', 'state'],
        },
      },
      ignore_unavailable: true,
    });

    console.log('test', JSON.stringify(res, null, 2));

    const filterdData = res.hits.hits.filter((v) => this.isValidDoc(v._source));

    return filterdData.map((v) => ({
      id: v._source.dbId,
      type: v._source.type,
    }));
  }

  isValidDoc(doc: Record<string, any>): boolean {
    try {
      schema.parse(doc);
      return true;
    } catch (error) {
      return false;
    }
  }
}
