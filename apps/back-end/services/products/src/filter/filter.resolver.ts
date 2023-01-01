import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FilterService } from './filter.service';
import { Filter } from './entities/filter.entity';
import { CreateFilterInput } from './dto/create-filter.input';
import { UpdateFilterInput } from './dto/update-filter.input';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { GetFiltersInput } from './dto';

@Resolver(() => Filter)
export class FilterResolver {
  constructor(private readonly filterService: FilterService) {}

  @Query(() => [Filter])
  getProductsFilters(
    @Args('getFiltersArgs') args: GetFiltersInput,
  ): Promise<Filter[]> {
    return this.filterService.getFilters(args);
  }

  @Mutation(() => Filter)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  createFilter(
    @Args('createFilterGroupArgs', { nullable: true }) args: CreateFilterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.filterService.createFilter(args, user.id);
  }

  @Mutation(() => Filter)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateFilter(
    @Args('updateFilterArgs') args: UpdateFilterInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.filterService.updateFilter(args, user.id);
  }

  @Mutation(() => Filter)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  deleteFilter(
    @Args('deleteFilterId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.filterService.deleteFilter(id, user.id);
  }
}
