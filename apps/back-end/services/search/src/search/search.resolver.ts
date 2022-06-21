import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';
import { SearchService } from './search.service';
import { Search } from './entities/search.entity';
import { SearchInput } from './dto/search.input';
import { Product } from './entities/product.entity';

@Resolver(() => Search)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => Search)
  searchWiaah(@Args('searchInputs') inputs: SearchInput) {
    return [inputs, inputs];
  }

  @ResolveField(() => [Product])
  products(@Parent() pro: Product) {
    console.log('parant', pro);

    return { __typename: 'Product', id: 'test filter' };
  }
}
