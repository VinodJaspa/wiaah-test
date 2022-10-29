import { BaseElasticDoucment } from 'nest-utils';
import { Location } from '../entities';

export class ShopElasticDocument extends BaseElasticDoucment(Location) {}
