import { UserPreferedLang } from 'nest-utils';
import { GqlVehicleServiceSelectedFields } from '../../';

export class GetAllVehiclesQuery {
  constructor(
    public readonly langId: UserPreferedLang,
    selectedFields: GqlVehicleServiceSelectedFields,
  ) {}
}
