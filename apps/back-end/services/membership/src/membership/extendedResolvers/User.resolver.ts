import { QueryBus } from '@nestjs/cqrs';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { Membership, Account } from '../entities';
import { GetMembershipPlanByIdQuery } from '../queries';

@Resolver(() => Account)
export class UserResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @ResolveField(() => Membership)
  Membership(
    @Parent() user: Account,
    @GqlCurrentUser() authUser: AuthorizationDecodedUser,
  ) {
    return this.queryBus.execute<GetMembershipPlanByIdQuery, Membership>(
      new GetMembershipPlanByIdQuery(user.membershipId, authUser),
    );
  }
}
