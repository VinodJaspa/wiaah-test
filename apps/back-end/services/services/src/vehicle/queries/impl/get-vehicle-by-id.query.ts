import { QueryBase } from 'nest-utils';

import { GqlVehicleSelectedFields } from '../../';

export class GetVehicleServiceByIdQuery extends QueryBase<
  {
    vehicleId: string;
  },
  GqlVehicleSelectedFields
> {}
