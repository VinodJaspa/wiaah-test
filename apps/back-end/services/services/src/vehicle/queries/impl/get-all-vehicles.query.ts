import { UserPreferedLang } from 'nest-utils';
import { GqlVehicleSelectedFields } from '../../';

export class GetAllVehiclesQuery {
  constructor(
    public readonly langId: UserPreferedLang,
    selectedFields: GqlVehicleSelectedFields,
  ) {}
}
