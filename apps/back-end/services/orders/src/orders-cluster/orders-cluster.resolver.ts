import { OrdersCluster } from '@entities';
import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, ResolveReference } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { OrdersClusterService } from './orders-cluster.service';

@Resolver((of) => OrdersCluster)
export class OrdersClusterResolver {
  constructor(private readonly orderClusterService: OrdersClusterService) {}

  @Mutation(() => OrdersCluster)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  createOrdersCluster(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<OrdersCluster> {
    return this.orderClusterService.createOrderCluster(user.id, user.shopId);
  }

  @ResolveReference()
  resloveReference({
    __typename,
    id,
    sellerId,
    shopId,
  }: Partial<{
    __typename: string;
    id: string;
    shopId: string;
    sellerId: string;
  }>) {
    if (id) {
      return this.orderClusterService.getClusterById(id);
    }
  }
}
