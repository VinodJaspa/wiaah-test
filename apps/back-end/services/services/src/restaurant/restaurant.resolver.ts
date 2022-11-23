import {
  Resolver,
  Mutation,
  Args,
  Query,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
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

import { RestaurantService } from './restaurant.service';
import {
  GetRestaurantByIdQuery,
  SearchFilteredRestaurantQuery,
} from './queries';
import {
  GqlRestaurantAggregationSelectedFields,
  GqlRestaurantSelectedFields,
} from './types/gqlSelectedFields';

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
  createRestaurantService(
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

  @ResolveReference()
  resloveReference(
    ref: { __typename: string; id: string },
    @GetLang() langId: UserPreferedLang,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields() fields: GqlRestaurantSelectedFields,
  ): Promise<Restaurant> {
    return this.queryBus.execute<GetRestaurantByIdQuery>(
      new GetRestaurantByIdQuery({
        id: ref.id,
        langId,
        selectedFields: fields,
        userId: user.id,
      }),
    );
  }
}
