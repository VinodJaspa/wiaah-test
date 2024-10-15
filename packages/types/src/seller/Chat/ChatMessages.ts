export interface ChatMessageType {
  id: string;
  userId: string;
  username: string;
  userPhoto: string;
  sendDate: string | number;
  messageContent?: string;
  messageAttachments?: ChatMessageAttachmentType[];
  seen: boolean;
  showUser: boolean;
}

export interface ChatMessageAttachmentType {
  type: MessageAttachmentType;
  src: string;
}

export enum MessageAttachmentType {
  Image = "image",
  Story = "story",
  VideoMessage = "videoMessage",
  VoiceMessage = "voiceMessage",
}
