import { AuthorizationDecodedUser } from 'nest-utils';

export class GetMembershipPlanByIdQuery {
  constructor(
    public readonly planId: string,
    public readonly userId?: string,
    public readonly user?: AuthorizationDecodedUser,
  ) {}
}
