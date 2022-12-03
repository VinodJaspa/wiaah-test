import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FilterService } from './filter.service';
import { Filter } from './entities/filter.entity';
import { CreateFilterInput } from './dto/create-filter.input';
import { UpdateFilterInput } from './dto/update-filter.input';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Filter)
export class FilterResolver {
  constructor(private readonly filterService: FilterService) {}

  @Query(() => [Filter])
  getProductsFilters(): Promise<Filter[]> {
    return this.filterService.getFilters();
  }

  @Mutation(() => Filter)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  createFilter(
    @Args('createFilterGroupArgs') args: CreateFilterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.filterService.createFilter(args, user.id);
  }

  @Mutation(() => Filter)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  updateFilter(
    @Args('updateFilterArgs') args: UpdateFilterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.filterService.updateFilter(args, user.id);
  }

  @Mutation(() => Filter)
  @UseGuards(new GqlAuthorizationGuard(['admin']))
  deleteFilter(
    @Args('deleteFilterId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.filterService.deleteFilter(id, user.id);
  }
}
