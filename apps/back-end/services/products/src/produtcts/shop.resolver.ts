import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { Shop } from './entities/shop.entity';
import { ProdutctsService } from './produtcts.service';

@Resolver((of) => Shop)
export class ShopResolver {
  constructor(private readonly productsService: ProdutctsService) {}

  @ResolveField((of) => [Product])
  public products(@Parent() shop: any) {
    return this.productsService.getAllByShopId(shop.id);
  }
}
