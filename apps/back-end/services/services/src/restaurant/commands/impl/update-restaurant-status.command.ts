import { RestaurantStatus } from '@restaurant/const';

export class UpdateRestaurantStatusCommand {
  constructor(
    public id: string,
    public status: RestaurantStatus,
  ) {}
}
