import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SellerOrdersService } from './seller-orders.service';
import { Order } from '@entities';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { RejectOrderRequestInput, AcceptOrderRequestInput } from '@dto';

@Resolver(() => Order)
@UseGuards(new GqlAuthorizationGuard(['seller']))
export class SellerOrdersResolver {
  constructor(private readonly sellerOrdersService: SellerOrdersService) {}

  @Mutation(() => Order)
  acceptOrderRequest(
    @GqlCurrentUser() { id }: AuthorizationDecodedUser,
    @Args('acceptOrderRequestArgs') { orderId }: AcceptOrderRequestInput,
  ): Promise<Order> {
    return this.sellerOrdersService.acceptOrderRequest(id, orderId);
  }

  @Mutation(() => Order)
  rejectOrderRequest(
    @GqlCurrentUser() { id }: AuthorizationDecodedUser,
    @Args('rejectOrderRequestArgs') input: RejectOrderRequestInput,
  ): Promise<Order> {
    return this.sellerOrdersService.rejectOrder(id, input);
  }
}
