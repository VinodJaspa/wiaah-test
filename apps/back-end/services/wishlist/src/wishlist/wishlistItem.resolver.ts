import { ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { WishlistItem } from './entities';
import { Product } from './entities/product.entity';
import { Service } from './entities/service.entity';

@Resolver((of) => WishlistItem)
export class WishlistItemResolver {
  @ResolveField((of) => Product, { nullable: true })
  product(@Parent() item: WishlistItem) {
    if (!item.itemId || item.itemType !== 'product') return null;
    return {
      __typename: 'Product',
      id: item.itemId,
    };
  }

  @ResolveField((of) => Service, { nullable: true })
  service(@Parent() item: WishlistItem) {
    return {
      __typename: 'Service',
      id: item.itemId,
    };
  }
}
