export * from './impl';
import {
  SearchHotelRoomLocationHandler,
  GetHotelByIdQueryHandler,
} from './handlers';

export const HotelQueryHandlers = [
  SearchHotelRoomLocationHandler,
  GetHotelByIdQueryHandler,
];
