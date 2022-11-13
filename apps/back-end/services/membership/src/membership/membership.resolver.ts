import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { Inject, UseGuards } from '@nestjs/common';

import { Membership } from './entities';
import { CreateMembershipInput } from './dto';
import { UpdateMembershipInput } from './dto';
import { CreateMembershipCommand, UpdateMembershipCommand } from './commands';
import { GetSubscriableMembershipsQuery } from './queries';
import { PrismaService } from 'prismaService';
import { ClientKafka } from '@nestjs/microservices';

@Resolver(() => Membership)
export class MembershipResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
    @Inject(SERVICES.MEMBERSHIP.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @Mutation(() => Membership)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  createMembership(
    @Args('args') args: CreateMembershipInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<CreateMembershipCommand, Membership>(
      new CreateMembershipCommand(args, user),
    );
  }

  @Mutation(() => Membership)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  updateMembership(
    @Args('args') args: UpdateMembershipInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandBus.execute<UpdateMembershipCommand, Membership>(
      new UpdateMembershipCommand(args, user),
    );
  }

  @Mutation(() => Boolean)
  async deleteAll() {
    await this.prisma.membership.deleteMany();
    await this.prisma.membershipTurnoverRule.deleteMany();
    return true;
  }

  @Query(() => [Membership])
  getSubscriableMemberships() {
    return this.queryBus.execute<GetSubscriableMembershipsQuery, Membership[]>(
      new GetSubscriableMembershipsQuery(),
    );
  }

  async onModuleInit() {
    await this.eventClient.connect();
    this.eventClient.subscribeToResponseOf(
      KAFKA_MESSAGES.BILLING_MESSAGES.getUserMembershipPriceId,
    );
  }
}
