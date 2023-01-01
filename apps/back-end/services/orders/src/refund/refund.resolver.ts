import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { AskForRefundInput, RejectRefundRequestInput } from '@refund/dto';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { CommandBus } from '@nestjs/cqrs';
import { Refund } from '@refund/entities';
import {
  AcceptRequestedRefundCommand,
  CreateRefundRequestCommand,
  RejectRequestedRefundCommand,
} from '@refund/commands';

@Resolver(() => Refund)
export class RefundResolver {
  constructor(private readonly commandbus: CommandBus) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.BUYER, accountType.SELLER]))
  async askForRefund(
    @Args('askForRefundArgs') args: AskForRefundInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandbus.execute(
      new CreateRefundRequestCommand(args, user.id),
    );
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async acceptRefundRequest(
    @Args('id', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandbus.execute(
      new AcceptRequestedRefundCommand(id, user.id),
    );
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async rejectRefundRequest(
    @Args('args') args: RejectRefundRequestInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandbus.execute(
      new RejectRequestedRefundCommand(args, user.id),
    );
    return true;
  }
}
