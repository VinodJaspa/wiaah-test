import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AdminGetMembersipSubscriptionInput } from './dto/admin-get-membership-subscriptions';
import { Account, Membership, MembershipSubscription } from './entities';

@Resolver(() => MembershipSubscription)
export class MembershipSubscriptionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [MembershipSubscription])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetMembershipSubscriptions(
    @Args('args') args: AdminGetMembersipSubscriptionInput,
  ) {
    return this.prisma.memberShipSubscription.findMany();
  }

  @ResolveField(() => Membership)
  membership(@Parent() sub: MembershipSubscription) {
    return this.prisma.membership.findUnique({
      where: {
        id: sub.membershipId,
      },
    });
  }

  @ResolveField(() => Account)
  subscriber(@Parent() sub: MembershipSubscription) {
    return {
      __typename: 'Account',
      id: sub.userId,
    };
  }
}
