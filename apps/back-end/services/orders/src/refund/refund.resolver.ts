import {
  Resolver,
  Mutation,
  Args,
  ID,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AskForRefundInput, RejectRefundRequestInput } from '@refund/dto';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
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
import { GetMyReturnedOrdersInput } from 'src/returned-orders/dto/get-my-returned-orders.input';
import { PrismaService } from 'prismaService';
import { Product } from '@orders/entities/extends';

@Resolver(() => Refund)
export class RefundResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private prisma: PrismaService,
  ) {}

  @Query(() => [Refund])
  getMyReturnedOrders(
    @Args('args') args: GetMyReturnedOrdersInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.refundRequest.findMany({
      where: {
        sellerId: user.id,
      },
      skip,
      take,
    });
  }

  @ResolveField(() => Product)
  product(@Parent() order: Refund) {
    return {
      __typename: 'Product',
      id: order.productId,
    };
  }

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
