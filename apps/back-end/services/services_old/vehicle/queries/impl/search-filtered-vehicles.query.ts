import { UserPreferedLang } from 'nest-utils';
import { GqlVehicleSelectedFields } from '../../types';
import { SearchFilteredVehicleInput } from '../../dto';

export class SearchFilteredVehiclesQuery {
  constructor(
    public readonly args: {
      input: SearchFilteredVehicleInput;
      langId: UserPreferedLang;
      selectedFields: GqlVehicleSelectedFields;
    },
  ) {}
}
