import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from '@restaurant';
import {
  CreateRestaurantInput,
  UpdateRestaurantInput,
  DeleteRestaurantInput,
  GetRestaurantInput,
  SearchFilteredRestaurantInput,
} from '@restaurant';
import {
  AuthorizationDecodedUser,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlSelectedQueryFields,
  UserPreferedLang,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SearchFilteredRestaurantQuery } from './queries';
import { GqlRestaurantAggregationSelectedFields } from './types/gqlSelectedFields';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [Restaurant])
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @Query(() => Restaurant)
  getRestaurant(
    @Args('getRestaurantArgs') input: GetRestaurantInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() lang: UserPreferedLang,
  ): Promise<Restaurant> {
    return this.restaurantService.getRestaurantById(input, user.id, lang);
  }

  @Mutation(() => Restaurant)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  createRestaurant(
    @Args('createRestaurantArgs') args: CreateRestaurantInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() lang: UserPreferedLang,
  ): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(args, user.id, lang);
  }

  @Mutation(() => Restaurant)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  updateRestaurant(
    @Args('updateRestaurantArgs') args: UpdateRestaurantInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() lang: UserPreferedLang,
  ) {
    return this.restaurantService.updateRestaurant(args, user.id, lang);
  }

  @Mutation(() => Restaurant)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  deleteRestaurant(
    @Args('deleteRestaurantArgs') args: DeleteRestaurantInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() lang: UserPreferedLang,
  ): Promise<Restaurant> {
    return this.restaurantService.deleteRestaurant(args, user.id, lang);
  }

  @Mutation(() => Restaurant)
  activateRestaurant(
    @Args('id', { type: () => Int }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.restaurantService.activateRestaurant(id, user.id);
  }

  @Query(() => [Restaurant])
  searchFilteredRestaurant(
    @Args('filtersInput') args: SearchFilteredRestaurantInput,
    @GetLang() langId: UserPreferedLang,
    @GqlSelectedQueryFields({ selectField: false })
    selectedFields: GqlRestaurantAggregationSelectedFields,
  ): Promise<Restaurant[]> {
    return this.queryBus.execute<SearchFilteredRestaurantQuery, Restaurant[]>(
      new SearchFilteredRestaurantQuery({
        langId,
        selectedFields,
        ...args,
      }),
    );
  }
}
