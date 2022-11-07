export * from './impl';
import {
  CreateGroupChatRoomCommandHandler,
  CreatePrivateChatRoomCommandHandler,
  IncrementRoomMembersUnSeenMessagesCommandHandler,
} from './handlers';

export const ChatRoomCommandHandlers = [
  CreateGroupChatRoomCommandHandler,
  CreatePrivateChatRoomCommandHandler,
  IncrementRoomMembersUnSeenMessagesCommandHandler,
];
