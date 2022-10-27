import { GqlVehicleServiceSelectedFields } from '@vehicle-service';
import { QueryBase } from 'nest-utils';

export class GetVehicleLocationSearch extends QueryBase<
  {
    query: string;
  },
  GqlVehicleServiceSelectedFields
> {}
