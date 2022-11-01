export * from './impl';
import {
  CreateGroupChatRoomCommandHandler,
  CreatePrivateChatRoomCommandHandler,
} from './handlers';

export const ChatRoomCommandHandlers = [
  CreateGroupChatRoomCommandHandler,
  CreatePrivateChatRoomCommandHandler,
];
