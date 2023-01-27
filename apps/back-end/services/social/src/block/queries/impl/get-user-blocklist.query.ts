import { GetMyBlocklistInput } from '@block/dto/get-my-block-list.input';
import { AuthorizationDecodedUser } from 'nest-utils';

export class GetUserBlocklistQuery {
  constructor(
    public readonly input: GetMyBlocklistInput,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
