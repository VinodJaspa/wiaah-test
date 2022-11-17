import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BuyerOrdersService } from './buyer-orders.service';
import { Order } from '@entities';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import {
  AcceptReceivedOrderInput,
  placeOrderInput,
  RejectRecievedOrderInput,
} from '@dto';
import { ClientKafka } from '@nestjs/microservices';

@Resolver(() => Order)
@UseGuards(new GqlAuthorizationGuard(['buyer', 'seller']))
export class BuyerOrdersResolver {
  constructor(private readonly buyerOrdersService: BuyerOrdersService) {}

  @Mutation(() => Order)
  acceptRecievedOrder(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('acceptRecievedOrder') input: AcceptReceivedOrderInput,
  ): Promise<Order> {
    return this.buyerOrdersService.acceptRecievedOrder(user.id, input);
  }

  @Mutation(() => Order)
  rejectRecievedOrder(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('rejectRecievedOrder') input: RejectRecievedOrderInput,
  ): Promise<Order> {
    return this.buyerOrdersService.rejectRecievedOrder(user.id, input);
  }

  @Mutation(() => Order)
  placeOrder(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('placeOrderArgs') input: placeOrderInput,
  ): Promise<Order> {
    return this.buyerOrdersService.createOrder(user.id, input);
  }
}
