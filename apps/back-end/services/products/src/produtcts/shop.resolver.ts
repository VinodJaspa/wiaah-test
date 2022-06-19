import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Produtct } from './entities/produtct.entity';
import { Shop } from './entities/shop.entity';
import { ProdutctsService } from './produtcts.service';

@Resolver((of) => Shop)
export class ShopResolver {
  constructor(private readonly productsService: ProdutctsService) {}

  @ResolveField((of) => [Produtct])
  public products(@Parent() shop: Shop) {
    return this.productsService.getAllByShopId(shop.id);
  }
}
