import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderItem } from './entities';
import { Product } from './entities/extends';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor() {}

  @ResolveField(() => Product)
  product(@Parent() orderItem: OrderItem) {
    return {
      __typename: 'Product',
      id: orderItem.id,
    };
  }
}
