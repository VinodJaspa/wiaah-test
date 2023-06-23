import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_EVENTS,
  SERVICES,
} from 'nest-utils';
import { Inject, UseGuards } from '@nestjs/common';
import { AccountVerification } from '@acc-verification/entities';
import { CreateAccountVerificationInput } from '@acc-verification/dto';
import { CreateAccountVerificationRequestCommand } from '@acc-verification/commands';
import { PrismaService } from 'prismaService';
import { ClientKafka } from '@nestjs/microservices';
import { RefuseAccountVerificationRequest } from './dto/refuse-account-verification.input';
import {
  AccountVerificationRequestAcceptedEvent,
  AccountVerificationRequestRejectedEvent,
} from 'nest-dto';
import { GetAccountVerificationRequestsInput } from './dto/get-account-verification-requests.input';

@Resolver(() => AccountVerification)
export class AccountVerificationResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  requestAccountVerification(
    @Args('args') args: CreateAccountVerificationInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<
      CreateAccountVerificationRequestCommand,
      boolean
    >(new CreateAccountVerificationRequestCommand(args, user.id));
  }

  @Query(() => [AccountVerification])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getAccountVerificationRequests(
    @Args('args') args: GetAccountVerificationRequestsInput,
  ): Promise<AccountVerification[]> {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.userAccountVerificationRequest.findMany({
      take,
      skip,
    });
  }

  @Query(() => AccountVerification)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetProfileVerificationRequest(
    @Args('id') id: string,
  ): Promise<AccountVerification> {
    return this.prisma.userAccountVerificationRequest.findUnique({
      where: { id },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async refuseAccountVerification(
    @Args('args') args: RefuseAccountVerificationRequest,
  ): Promise<boolean> {
    const res = await this.prisma.userAccountVerificationRequest.update({
      where: {
        id: args.id,
      },
      data: {
        status: 'rejected',
        refuseReason: args.reason,
      },
    });

    const account = await this.prisma.account.findUnique({
      where: {
        id: res.userId,
      },
    });

    this.eventClient.emit(
      KAFKA_EVENTS.ACCOUNTS_EVENTS.accountVerificationRequestRejected,
      new AccountVerificationRequestRejectedEvent({
        email: account.email,
        firstName: account.firstName,
        id: res.id,
        lang: account.lang,
        lastName: account.lastName,
        phone: account.phone,
        rejectReason: res.refuseReason,
      }),
    );

    return true;
  }

  @Query(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async acceptAccountVerification(@Args('id') id: string): Promise<boolean> {
    const res = await this.prisma.userAccountVerificationRequest.update({
      where: {
        id,
      },
      data: {
        status: 'accepted',
      },
    });

    const account = await this.prisma.account.update({
      where: {
        id: res.userId,
      },
      data: {
        verified: true,
      },
    });

    this.eventClient.emit(
      KAFKA_EVENTS.ACCOUNTS_EVENTS.accountVerificationRequestAccepted,
      new AccountVerificationRequestAcceptedEvent({
        email: account.email,
        firstName: account.firstName,
        id: res.id,
        lang: account.lang,
        lastName: account.lastName,
        phone: account.phone,
      }),
    );

    return true;
  }
}
