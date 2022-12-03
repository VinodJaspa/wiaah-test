import { Injectable } from '@nestjs/common';
import { ELASTIC_INDICES } from 'nest-utils';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { z } from 'zod';

const schema = z
  .object({
    dbId: z.string(),
    type: z.string(),
  })
  .required();

type SchemaType = z.infer<typeof schema>;

const {
  BEAUTY_CENTER_LOCATION_INDEX,
  HEALTH_CENTER_LOCATION_INDEX,
  HOTEL_LOCATION_INDEX,
  RESTAURANT_LOCATION_INDEX,
  SHOP_LOCATION_INDEX,
  VEHICLE_LOCATION_INDEX,
} = ELASTIC_INDICES;

@Injectable()
export class SearchElasticRepository {
  constructor(private readonly elasticService: ElasticsearchService) {}

  index = [
    BEAUTY_CENTER_LOCATION_INDEX,
    HEALTH_CENTER_LOCATION_INDEX,
    HOTEL_LOCATION_INDEX,
    RESTAURANT_LOCATION_INDEX,
    SHOP_LOCATION_INDEX,
    VEHICLE_LOCATION_INDEX,
  ];

  async getPropertiesIdsAndTypesByLocationQuery(
    query: string,
  ): Promise<SchemaType[]> {
    const res = await this.elasticService.search<SchemaType>({
      index: this.index,
      query: {
        multi_match: {
          query,
          fuzziness: 'AUTO',
          fields: ['address', 'city', 'country', 'state'],
        },
      },
      ignore_unavailable: true,
    });

    const filterdData = res.hits.hits.filter((v) => this.isValidDoc(v._source));

    return filterdData.map((v) => ({
      id: v._source.dbId,
      type: v._source.type,
    }));
  }

  async getPropertiesIdsByTypeQuery(
    query: string,
  ): Promise<{ ids: string[]; type: string }> {
    const res = await this.elasticService.search<SchemaType>({
      index: this.index,
      query: {
        multi_match: {
          query,
          fields: ['type'],
        },
      },
    });

    return {
      ids: res.hits.hits
        .map((v) => v._source.dbId)
        .filter((v) => {
          try {
            z.string().parse(v);
            return true;
          } catch {
            return false;
          }
        }),
      type: res.hits.hits.at(0)._source.type,
    };
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
