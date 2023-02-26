import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { Inject, UseGuards } from '@nestjs/common';
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
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  createMembership(
    @Args('args') args: CreateMembershipInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<CreateMembershipCommand, Membership>(
      new CreateMembershipCommand(args, user),
    );
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

  async onModuleInit() {
    await this.eventClient.connect();
    this.eventClient.subscribeToResponseOf(
      KAFKA_MESSAGES.BILLING_MESSAGES.getUserMembershipPriceId,
    );
  }
}
