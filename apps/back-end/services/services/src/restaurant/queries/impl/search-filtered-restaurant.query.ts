import { QueryBase } from 'nest-utils';
import { GqlRestaurantAggregationSelectedFields } from '../../types/';
import { SearchFilteredRestaurantInput } from '../../dto';

export class SearchFilteredRestaurantQuery extends QueryBase<
  SearchFilteredRestaurantInput,
  GqlRestaurantAggregationSelectedFields
> {}
