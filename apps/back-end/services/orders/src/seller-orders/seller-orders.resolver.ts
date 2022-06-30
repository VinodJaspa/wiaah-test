import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SellerOrdersService } from './seller-orders.service';
import { SellerOrder } from './entities/seller-order.entity';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { Order } from 'src/orders/entities/order.entity';
import { GetMyOrdersInput } from './dto/get-orders.input';

@Resolver(() => SellerOrder)
export class SellerOrdersResolver {
  constructor(private readonly sellerOrdersService: SellerOrdersService) {}

  @Query((type) => [Order])
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  getOrders(
    @Args('GetMyOrdersArgs') args: GetMyOrdersInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.sellerOrdersService.getFilteredOrders(user.id, args);
  }

  // @Mutation(()=> Boolean)
  // createPlaceholderOrders(){
  //   return this.sellerOrdersService.createPlaceholderOrders()
  // }
}
