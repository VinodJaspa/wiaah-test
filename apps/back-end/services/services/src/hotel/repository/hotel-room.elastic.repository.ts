import { ServiceLocation } from '@entities';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

const HOTEL_ROOM_ELASTIC_SEARCH_INDEX = 'hotel-room';

@Injectable()
export class HotelRoomElasticRepository {
  constructor(private readonly elasticSearch: ElasticsearchService) {}

  async createRoomIndex(input: { id: string; location: ServiceLocation }) {
    await this.elasticSearch.index({
      index: HOTEL_ROOM_ELASTIC_SEARCH_INDEX,
      document: {
        mongoId: input.id,
        ...input.location,
      },
    });
  }

  async getRoomsIdByLocationQuery(query: string): Promise<string[]> {
    const res = await this.elasticSearch.search<{ mongoId: string }>({
      index: HOTEL_ROOM_ELASTIC_SEARCH_INDEX,
      query: {
        multi_match: {
          query,
          fields: ['address', 'state', 'country', 'city'],
          type: 'bool_prefix',
          fuzziness: 'AUTO',
        },
      },
    });

    return res.hits.hits.map((v) => {
      return v._source.mongoId;
    });
  }
}
