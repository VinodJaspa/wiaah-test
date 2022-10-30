import { CommandBase } from 'nest-utils';
import { GqlLocalizationSelectedFields } from '../../types/';

export class SearchPlacesCommand extends CommandBase<
  {
    query: string;
  },
  GqlLocalizationSelectedFields
> {}
