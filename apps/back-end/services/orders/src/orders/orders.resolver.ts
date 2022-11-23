import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { GetMyOrdersInput } from '@dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Order } from '@orders/entities';
import { GetBuyerOrdersQuery, GetSellerOrdersQuery } from '@orders/queries';
import {
  AcceptReceivedOrderInput,
  AcceptRequestedOrderInput,
  RejectReceivedOrderInput,
  RejectRequestedOrderInput,
} from '@orders/dto';
import {
  AcceptOrderCommand,
  AcceptReceivedOrderCommand,
  RejectOrderCommand,
  RejectReceivedOrderCommand,
} from './commands';

@Resolver(() => Order)
export class OrdersResolver implements OnModuleInit {
  constructor(
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly queryBus: QueryBus,
    private readonly commandbus: CommandBus,
  ) {}

  @Query((type) => [Order])
  @UseGuards(new GqlAuthorizationGuard([accountType.BUYER, accountType.SELLER]))
  getMyOrders(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('getMyOrdersArgs', { nullable: true }) args: GetMyOrdersInput,
  ) {
    if (user.accountType === 'buyer') {
      return this.queryBus.execute<GetBuyerOrdersQuery, Order[]>(
        new GetBuyerOrdersQuery(user.id, args.status),
      );
    } else if (user.accountType === 'seller') {
      return this.queryBus.execute<GetSellerOrdersQuery, Order[]>(
        new GetSellerOrdersQuery(user.id, args.status),
      );
    }
  }

  @Mutation(() => Boolean)
  rejectReceivedOrder(
    @Args('args') args: RejectReceivedOrderInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<RejectReceivedOrderCommand, boolean>(
      new RejectReceivedOrderCommand(args, user.id),
    );
  }

  @Mutation(() => Boolean)
  rejectRequestedOrder(
    @Args('args') args: RejectRequestedOrderInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<RejectOrderCommand, boolean>(
      new RejectOrderCommand(args.id, user.id),
    );
  }

  @Mutation(() => Boolean)
  acceptRequestedOrder(
    @Args('args') args: AcceptRequestedOrderInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<AcceptOrderCommand, boolean>(
      new AcceptOrderCommand(args.id, user.id),
    );
  }

  @Mutation(() => Boolean)
  acceptReceivedOrder(
    @Args('args') args: AcceptReceivedOrderInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<AcceptReceivedOrderCommand, boolean>(
      new AcceptReceivedOrderCommand(args.id, user.id),
    );
  }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsMetaData,
    );
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountById,
    );
    await this.eventsClient.connect();
  }
}
