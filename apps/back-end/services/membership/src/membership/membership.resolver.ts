import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
  StripeService,
} from 'nest-utils';
import {
  Inject,
  NotFoundException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Membership, MembershipSubscription } from '@membership/entities';
import {
  AdminGetMembershipsInput,
  CreateMembershipInput,
  UpdateMembershipInput,
} from '@membership/dto';
import {
  CreateMembershipCommand,
  UpdateMembershipCommand,
} from '@membership/commands';
import { GetSubscriableMembershipsQuery } from '@membership/queries';
import { PrismaService } from 'prismaService';
import { ClientKafka } from '@nestjs/microservices';
import { Prisma } from 'prismaClient';

@Resolver(() => Membership)
export class MembershipResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
    @Inject(SERVICES.MEMBERSHIP.token)
    private readonly eventClient: ClientKafka,
    private readonly stripe: StripeService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async createMembership(
    @Args('args') args: CreateMembershipInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<Boolean> {
    const res = await this.commandBus.execute<
      CreateMembershipCommand,
      Membership
    >(new CreateMembershipCommand(args, user));

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateMembership(
    @Args('args') args: UpdateMembershipInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<UpdateMembershipCommand, Membership>(
      new UpdateMembershipCommand(args, user),
    );
  }

  @Query(() => [Membership])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetMemberships(
    @Args('args') args: AdminGetMembershipsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    let filters: Prisma.MembershipWhereInput[] = [];

    if (args.name) {
      filters.push({
        name: {
          contains: args.name,
        },
      });
    }

    if (args.sortOrder) {
    }

    return this.prisma.membership.findMany({
      where: {
        AND: filters,
      },
    });
  }

  @Query(() => [Membership])
  getSubscriableMemberships() {
    return this.queryBus.execute<GetSubscriableMembershipsQuery, Membership[]>(
      new GetSubscriableMembershipsQuery(),
    );
  }

  @Query(() => MembershipSubscription, { nullable: true })
  getMyMembership(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.prisma.memberShipSubscription.findUnique({
      where: {
        userId: user.id,
      },
    });
  }

  @Mutation(() => Boolean)
  async unsubscribe(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    try {
      const sub = await this.prisma.memberShipSubscription.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!sub)
        throw new NotFoundException('You dont have an active subscription');

      const stripeProm = this.stripe.deleteCustomerSubscription(
        sub.stripeSubId,
      );

      const subPromise = this.prisma.memberShipSubscription.delete({
        where: {
          userId: user.id,
        },
      });

      await Promise.all([stripeProm, subPromise]);

      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => String, { nullable: true })
  async subscribeMembership(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('membershipId') id: string,
  ) {
    const alreadySubscribed =
      await this.prisma.memberShipSubscription.findUnique({
        where: {
          userId: user.id,
        },
      });

    if (alreadySubscribed)
      throw new UnprocessableEntityException(
        'You already has an active subscription, please unsubscribe first',
      );

    const membership = await this.prisma.membership.findUnique({
      where: {
        id,
      },
    });

    if (!membership) throw new NotFoundException();

    const stripeSubscription = await this.stripe.createCustomerSubscription(
      user.stripeCustomerId,
      membership.priceIds,
      {
        itemId: id,
        userId: user.id,
      },
    );

    await this.prisma.memberShipSubscription.create({
      data: {
        membershipId: id,
        userId: user.id,
        stripeSubId: stripeSubscription.subscriptionObj.id,
        endAt: new Date(
          stripeSubscription?.subscriptionObj?.current_period_end,
        ),
        startAt: new Date(
          stripeSubscription?.subscriptionObj?.current_period_start,
        ),
      },
    });

    return stripeSubscription.clientSecret;
  }

  async onModuleInit() {
    await this.eventClient.connect();
    this.eventClient.subscribeToResponseOf(
      KAFKA_MESSAGES.BILLING_MESSAGES.getUserMembershipPriceId,
    );
  }
}
