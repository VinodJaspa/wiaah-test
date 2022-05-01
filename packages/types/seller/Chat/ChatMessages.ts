export interface ChatMessage {
  id: string;
  username: string;
  sendDate: string;
  messageContent?: string;
  messageAttachments?: MessageAttachment[];
}

export interface MessageAttachment {
  type: MessageAttachmentTypes;
  src: string;
}

export type MessageAttachmentTypes = "image" | "video" | "audio";
