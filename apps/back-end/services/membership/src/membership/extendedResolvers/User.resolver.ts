import { QueryBus } from '@nestjs/cqrs';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Membership, Account, MembershipSubscription } from '../entities';
import { GetMembershipPlanByIdQuery } from '../queries';

@Resolver(() => Account)
export class UserResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @ResolveField(() => Membership)
  Membership(
    @Parent() user: Account,
    @GqlCurrentUser() authUser: AuthorizationDecodedUser,
  ) {
    return this.queryBus.execute<GetMembershipPlanByIdQuery, Membership>(
      new GetMembershipPlanByIdQuery(user.membershipId, authUser.id),
    );
  }

  @ResolveField(() => MembershipSubscription)
  subscribedPlan(@Parent() user: Account): Promise<MembershipSubscription> {
    return this.prisma.memberShipSubscription.findUnique({
      where: {
        userId: user.id,
      },
    });
  }
}
