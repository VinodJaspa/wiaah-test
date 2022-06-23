import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { Search } from './entities/search.entity';
import { ProductsService } from './products.service';

@Resolver((of) => Search)
export class SearchResolver {
  constructor(private readonly productsService: ProductsService) {}

  @ResolveField((of) => [Product])
  public products(@Parent() search: Search) {
    if (!search.filter) throw new Error('filter field not provided');
    if (typeof search.filter !== 'string')
      throw new Error('filter field must be of type string');
    const parsedFilter = JSON.parse(search.filter);
    if (!Array.isArray(parsedFilter))
      throw new Error('filter field must be a stringified array');
    console.log('search resolver', parsedFilter);
    return this.productsService.getFilteredProducts(parsedFilter);
  }
}
