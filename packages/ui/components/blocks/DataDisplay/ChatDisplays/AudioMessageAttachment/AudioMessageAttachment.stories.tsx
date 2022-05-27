import { storybookChatDisplay, AudioMessageAttachment } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookChatDisplay + "AudioMessageAttachment",
  component: AudioMessageAttachment,
} as ComponentMeta<typeof AudioMessageAttachment>;

export const Default = () => <AudioMessageAttachment src="/video.mp4" />;
