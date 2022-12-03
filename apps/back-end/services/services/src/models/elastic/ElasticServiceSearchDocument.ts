import { ServiceLocation } from '@entities';
import { BaseElasticDoucment } from './BaseElasticDocument';

export class ElasticServiceSearchDocument extends BaseElasticDoucment(
  ServiceLocation,
) {}
