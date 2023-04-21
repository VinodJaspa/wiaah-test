import { GetUserActionsInput } from '@action/dto';
import { GqlCursorPaginationInput, GqlPaginationInput } from 'nest-utils';

export class GetUserActionsQuery {
  constructor(
    public readonly args: GetUserActionsInput,
    public readonly requesterId?: string,
  ) {}
}
