import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Restaurant } from '../../entities';
import { RestaurantRepository } from '../../repository';
import { SearchFilteredRestaurantQuery } from '../impl/search-filtered-restaurant.query';

@QueryHandler(SearchFilteredRestaurantQuery)
export class SearchFilteredRestaurantQueryHandler
  implements IQueryHandler<SearchFilteredRestaurantQuery>
{
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async execute({
    args: { langId, selectedFields, ...rest },
  }: SearchFilteredRestaurantQuery): Promise<Restaurant[]> {
    return this.restaurantRepository.searchFilteredRestaurant(
      rest,
      selectedFields,
      langId,
    );
  }
}
