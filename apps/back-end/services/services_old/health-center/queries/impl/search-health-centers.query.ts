import { UserPreferedLang } from 'nest-utils';
import { GqlHealthCenterSelectedFields } from '../../types';

export class SearchHealthCenterQuery {
  constructor(
    public readonly input: {
      selectedFields: GqlHealthCenterSelectedFields;
      langId: UserPreferedLang;
      input;
    },
  ) {}
}
