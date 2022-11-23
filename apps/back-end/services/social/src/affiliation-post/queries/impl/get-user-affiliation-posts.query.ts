import { GqlPaginationInput } from 'nest-utils';

export class GetUserAffiliationPostsQuery {
  constructor(
    public readonly authorId: string,
    public readonly userId: string,
    public readonly pagination: GqlPaginationInput,
  ) {}
}
