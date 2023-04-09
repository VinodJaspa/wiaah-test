import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { VehicleElasticDocument } from '../models';

const VEHICLE_SERVICE_ELASTIC_SEARCH_INDEX = 'vehicle-service-search';

@Injectable()
export class VehicleServiceElasticRepository {
  constructor(private readonly elasticDb: ElasticsearchService) {}

  indexVehicle(vehicle: VehicleElasticDocument) {
    this.elasticDb.index({
      index: VEHICLE_SERVICE_ELASTIC_SEARCH_INDEX,
      document: vehicle,
      refresh: true,
    });
  }

  async searchVehicleIdsByQuery(query: string): Promise<string[]> {
    const res = await this.elasticDb.search<VehicleElasticDocument>({
      index: VEHICLE_SERVICE_ELASTIC_SEARCH_INDEX,
      query: {
        multi_match: {
          query,
          fields: ['address', 'city', 'state', 'country'],
          type: 'bool_prefix',
        },
      },
    });

    return res.hits.hits.map((v) => v._source.dbId);
  }
}
