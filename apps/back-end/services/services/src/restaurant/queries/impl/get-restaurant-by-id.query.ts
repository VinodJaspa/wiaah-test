import { QueryBase } from 'nest-utils';
import { GqlRestaurantSelectedFields } from '../../types';

export class GetRestaurantByIdQuery extends QueryBase<
  {
    id: string;
    userId: string;
  },
  GqlRestaurantSelectedFields
> {}
