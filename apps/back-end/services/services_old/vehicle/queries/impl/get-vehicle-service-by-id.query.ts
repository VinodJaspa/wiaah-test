import { QueryBase } from 'nest-utils';

import { GqlVehicleServiceSelectedFields } from '../../';

export class GetVehicleServiceByIdQuery extends QueryBase<
  {
    vehicleId: string;
  },
  GqlVehicleServiceSelectedFields
> {}
