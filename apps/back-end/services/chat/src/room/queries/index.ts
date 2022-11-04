export * from './impl';
import {
  GetMyRoomsQueryHandler,
  GetRoomByUserIdQueryHandler,
} from './handlers';

export const RoomsQueryHandlers = [
  GetMyRoomsQueryHandler,
  GetRoomByUserIdQueryHandler,
];
