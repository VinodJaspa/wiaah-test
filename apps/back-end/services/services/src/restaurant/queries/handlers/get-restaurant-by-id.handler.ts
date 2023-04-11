import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Restaurant } from '../../entities';
import { RestaurantRepository } from '../../repository';
import { GetRestaurantByIdQuery } from '../impl/get-restaurant-by-id.query';

@QueryHandler(GetRestaurantByIdQuery)
export class GetRestuarntByIdQueryHandler
  implements IQueryHandler<GetRestaurantByIdQuery>
{
  constructor(private readonly restaurantRepo: RestaurantRepository) {}

  execute({
    args: { id, langId, selectedFields, userId },
  }: GetRestaurantByIdQuery): Promise<Restaurant> {
    return this.restaurantRepo.getRestaurantById({ id }, userId, langId);
  }
}
