import { storybookChatDisplay, ChatMessageAttachment } from "@UI";
import { ComponentMeta } from "@storybook/react";
import { MessageAttachmentType } from "@features/API";

export default {
  title: storybookChatDisplay + "ChatMessageAttachment",
  component: ChatMessageAttachment,
} as ComponentMeta<typeof ChatMessageAttachment>;

export const image = () => (
  <ChatMessageAttachment
    attachment={{ src: "/place-2.jpg", type: MessageAttachmentType.Image }}
  />
);
export const video = () => (
  <ChatMessageAttachment
    attachment={{ src: "/video.mp4", type: MessageAttachmentType.VideoMessage }}
  />
);
export const audio = () => (
  <ChatMessageAttachment
    attachment={{ src: "/video.mp4", type: MessageAttachmentType.VoiceMessage }}
  />
);
