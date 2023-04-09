import { QueryBase } from 'nest-utils';
import { GqlBeautyCenterSelectedFields } from '../../types';

export class GetBeautyCenterByIdQuery extends QueryBase<
  {
    id: string;
    userId: string;
  },
  GqlBeautyCenterSelectedFields
> {}
