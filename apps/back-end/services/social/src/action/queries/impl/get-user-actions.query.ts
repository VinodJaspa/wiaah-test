import { GqlPaginationInput } from 'nest-utils';

export class GetUserActionsQuery {
  constructor(
    public readonly userId: string,
    public readonly pagination: GqlPaginationInput,
    public readonly requesterId?: string,
  ) {}
}
