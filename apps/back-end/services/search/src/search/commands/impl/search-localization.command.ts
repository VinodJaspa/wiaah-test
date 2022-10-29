import { CommandBase } from 'nest-utils';
import { GetLocalizationInput } from 'src/search/dto';

export class SearchLocalizationCommand extends CommandBase<
  GetLocalizationInput & { userId: string }
> {}
