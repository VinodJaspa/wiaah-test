export * from './impl';
import {
  UserJoinedRoomEventHandler,
  UserLeftRoomEventHandler,
} from './handler';

export const RoomEventHandlers = [
  UserJoinedRoomEventHandler,
  UserLeftRoomEventHandler,
];
