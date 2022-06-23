import { Param } from '@nestjs/common';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { Shop } from './entities/shop.entity';
import { ShopService } from './shop.service';

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private readonly shopService: ShopService) {}

  @ResolveField((of) => Shop)
  public shop(@Param() product: Product) {
    console.log('product', product);
    return this.shopService.getShopById(product.storeId);
  }
}
