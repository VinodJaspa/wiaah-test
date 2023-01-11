import { Resolver } from '@nestjs/graphql';
import { SearchShop } from './entities/search-shop.entity';

@Resolver(() => SearchShop)
export class SearchShopsResolver {
  constructor() {}
}
