export * from './impl';
import {
  SearchFilteredRestaurantQueryHandler,
  GetRestuarntByIdQueryHandler,
} from './handlers';

export const RestaurantQueryHandlers = [
  SearchFilteredRestaurantQueryHandler,
  GetRestuarntByIdQueryHandler,
];
