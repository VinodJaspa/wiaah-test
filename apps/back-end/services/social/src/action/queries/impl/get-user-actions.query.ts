import { GetUserActionsInput } from '@action/dto';

export class GetUserActionsQuery {
  constructor(
    public readonly args: GetUserActionsInput,
    public readonly requesterId?: string,
  ) {}
}
