import { GqlVehicleSelectedFields } from '@vehicle-service';
import { QueryBase } from 'nest-utils';

export class GetVehicleLocationSearch extends QueryBase<
  {
    query: string;
  },
  GqlVehicleSelectedFields
> {}
