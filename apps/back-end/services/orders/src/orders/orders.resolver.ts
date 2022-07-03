import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from '@entities';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { SellerOrdersService } from 'src/seller-orders/seller-orders.service';
import { BuyerOrdersService } from 'src/buyer-orders/buyer-orders.service';
import { GetMyOrdersInput } from '@dto';

@Resolver(() => Order)
export class OrdersResolver implements OnModuleInit {
  constructor(
    private readonly sellerOrdersService: SellerOrdersService,
    private readonly buyerOrdersService: BuyerOrdersService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

  @Query((type) => [Order])
  @UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
  getMyOrders(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('getMyOrdersArgs', { nullable: true }) args: GetMyOrdersInput,
  ) {
    if (user.accountType === 'buyer') {
      return this.buyerOrdersService.getMyOrders(user.id, args);
    } else if (user.accountType === 'seller') {
      return this.sellerOrdersService.getMyOrders(user.id, args);
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
