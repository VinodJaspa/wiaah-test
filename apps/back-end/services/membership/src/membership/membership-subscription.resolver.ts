import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { Membership, MembershipSubscription } from './entities';

@Resolver(() => MembershipSubscription)
export class MembershipSubscriptionResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Membership)
  membership(@Parent() sub: MembershipSubscription) {
    return this.prisma.membership.findUnique({
      where: {
        id: sub.membershipId,
      },
    });
  }
}
