import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { Search } from './entities/search.entity';
import { ProdutctsService } from './produtcts.service';

@Resolver((of) => Search)
export class SearchResolver {
  constructor(private readonly productsService: ProdutctsService) {}

  @ResolveField((of) => [Product])
  public products(@Parent() search: Search) {
    console.log('search resolver', search);
    return [];
  }
}
