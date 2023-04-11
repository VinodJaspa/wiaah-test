import { GqlSelectedFields } from 'nest-utils';
import { Restaurant } from '../entities';

export type GqlRestaurantSelectedFields = GqlSelectedFields<Restaurant>;
export type GqlRestaurantAggregationSelectedFields = GqlSelectedFields<
  Restaurant,
  false
>;
