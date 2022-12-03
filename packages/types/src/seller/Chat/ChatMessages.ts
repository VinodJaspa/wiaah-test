export interface ChatMessageType {
  id: string;
  username: string;
  userPhoto: string;
  sendDate: string | number;
  messageContent?: string;
  messageAttachments?: ChatMessageAttachmentType[];
}

export interface ChatMessageAttachmentType {
  type: MessageAttachmentTypes;
  src: string;
}

export type MessageAttachmentTypes = "image" | "video" | "audio" | "story";
