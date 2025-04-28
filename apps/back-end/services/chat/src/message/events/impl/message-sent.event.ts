import { ChatMessage } from '../../entities';

export class ChatMessageSentEvent {
  constructor(
    public userId: string,
    public message: ChatMessage,
  ) {}
}
