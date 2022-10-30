import { GqlBeautyCenterSelectedFields } from '../../types';
import { SearchFilteredBeautyCenterInput } from '../../dto';
import { UserPreferedLang } from 'nest-utils';

export class SearchFilteredBeautyCenterQuery {
  constructor(
    public readonly input: {
      args: SearchFilteredBeautyCenterInput;
      selectedFields: GqlBeautyCenterSelectedFields;
      langId: UserPreferedLang;
    },
  ) {}
}
