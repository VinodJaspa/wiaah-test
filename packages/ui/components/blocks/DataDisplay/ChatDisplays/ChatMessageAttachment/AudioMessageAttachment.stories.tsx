import { storybookChatDisplay, ChatMessageAttachment } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookChatDisplay + "ChatMessageAttachment",
  component: ChatMessageAttachment,
} as ComponentMeta<typeof ChatMessageAttachment>;

export const image = () => (
  <ChatMessageAttachment attachment={{ src: "/place-2.jpg", type: "image" }} />
);
export const video = () => (
  <ChatMessageAttachment attachment={{ src: "/video.mp4", type: "video" }} />
);
export const audio = () => (
  <ChatMessageAttachment attachment={{ src: "/video.mp4", type: "audio" }} />
);
