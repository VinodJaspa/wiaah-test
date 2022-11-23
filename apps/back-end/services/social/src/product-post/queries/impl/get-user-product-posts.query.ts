import { GqlPaginationInput } from 'nest-utils';

export class GetUserProductPostsQuery {
  constructor(
    public readonly authorId: string,
    public readonly userId: string,
    public readonly pagination: GqlPaginationInput,
  ) {}
}
