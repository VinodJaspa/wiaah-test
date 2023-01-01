import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SearchShopsService } from './search-shops.service';
import { SearchShop } from './entities/search-shop.entity';
import { CreateSearchShopInput } from './dto/create-search-shop.input';
import { UpdateSearchShopInput } from './dto/update-search-shop.input';

@Resolver(() => SearchShop)
export class SearchShopsResolver {
  constructor(private readonly searchShopsService: SearchShopsService) {}

  @Mutation(() => SearchShop)
  createSearchShop(@Args('createSearchShopInput') createSearchShopInput: CreateSearchShopInput) {
    return this.searchShopsService.create(createSearchShopInput);
  }

  @Query(() => [SearchShop], { name: 'searchShops' })
  findAll() {
    return this.searchShopsService.findAll();
  }

  @Query(() => SearchShop, { name: 'searchShop' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.searchShopsService.findOne(id);
  }

  @Mutation(() => SearchShop)
  updateSearchShop(@Args('updateSearchShopInput') updateSearchShopInput: UpdateSearchShopInput) {
    return this.searchShopsService.update(updateSearchShopInput.id, updateSearchShopInput);
  }

  @Mutation(() => SearchShop)
  removeSearchShop(@Args('id', { type: () => Int }) id: number) {
    return this.searchShopsService.remove(id);
  }
}
