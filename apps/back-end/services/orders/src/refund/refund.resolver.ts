import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AskForRefundInput } from '@refund/dto';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { CommandBus } from '@nestjs/cqrs';
import { Refund } from '@refund/entities';
import { CreateRefundRequestCommand } from '@refund/commands';

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
}
