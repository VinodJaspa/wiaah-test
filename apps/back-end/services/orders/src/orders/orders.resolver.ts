import { Resolver, Query, Args } from '@nestjs/graphql';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { GetMyOrdersInput } from '@dto';
import { CommandBus } from '@nestjs/cqrs';
import { Order } from '@orders/entities';
import { GetBuyerOrdersQuery, GetSellerOrdersQuery } from '@orders/queries';

@Resolver(() => Order)
export class OrdersResolver implements OnModuleInit {
  constructor(
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly commandbus: CommandBus,
  ) {}

  @Query((type) => [Order])
  @UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
  getMyOrders(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('getMyOrdersArgs', { nullable: true }) args: GetMyOrdersInput,
  ) {
    if (user.accountType === 'buyer') {
      return this.commandbus.execute<GetBuyerOrdersQuery, Order[]>(
        new GetBuyerOrdersQuery(user.id, args.status),
      );
    } else if (user.accountType === 'seller') {
      return this.commandbus.execute<GetSellerOrdersQuery, Order[]>(
        new GetSellerOrdersQuery(user.id, args.status),
      );
    }
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
