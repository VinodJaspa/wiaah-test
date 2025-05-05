import { storybookChatDisplay, ChatMessageAttachment } from "@UI";
import { Meta } from "@storybook/react";
import { MessageAttachmentType } from "@features/API";

export default {
  title: "UI / blocks / Chat Display /ChatMessageAttachment",
  component: ChatMessageAttachment,
} as Meta<typeof ChatMessageAttachment>;

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
