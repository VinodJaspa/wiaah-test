import { AuthorizationDecodedUser } from 'nest-utils';

export class GetMembershipPriceIdQuery {
  constructor(
    public readonly membershipId: string,
    public readonly user: AuthorizationDecodedUser,
  ) {}
}
