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
import { GetMyReturnedOrdersInput } from '../returned-orders/dto/get-my-returned-orders.input';
import { PrismaService } from 'prismaService';
import { Product } from '@orders/entities/extends';

@Resolver(() => Refund)
export class RefundResolver {
  constructor(
    private readonly commandbus: CommandBus,
    private prisma: PrismaService,
  ) {}

  @Query(() => [Refund])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.BUYER]))
  async getMyReturnedOrders(
    @Args('args') args: GetMyReturnedOrdersInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const { skip, take } = ExtractPagination(args.pagination);

    const res = await this.prisma.refundRequest.findMany({
      where:
        user.accountType === accountType.SELLER
          ? { sellerId: user.id }
          : { requestedById: user.id },
      skip,
      take,
    });
    return res;
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
