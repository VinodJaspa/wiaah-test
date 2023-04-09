import { QueryBase } from 'nest-utils';
import { GqlHealthCenterSelectedFields } from '../../types';

export class GetHealthCenterByIdQuery extends QueryBase<
  {
    id: string;
    userId: string;
  },
  GqlHealthCenterSelectedFields
> {}
