import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { Shop } from './entities/shop.entity';
import { ProductsService } from './products.service';

@Resolver((of) => Shop)
export class ShopResolver {
  constructor(private readonly productsService: ProductsService) {}

  @ResolveField((of) => [Product])
  public products(@Parent() shop: Shop) {
    console.log('resolving products for shop', shop);
    return this.productsService.getAllByShopId(shop.name);
  }
}
