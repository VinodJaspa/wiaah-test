import { QueryBase } from 'nest-utils';
import { GqlVehicleSelectedFields } from '../../types';

export class GetVehicleByIdQuery extends QueryBase<
  {
    vehicleId: string;
    userId: string;
  },
  GqlVehicleSelectedFields
> {}
