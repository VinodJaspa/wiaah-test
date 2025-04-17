import { storybookChatDisplay, AudioMessageAttachment } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Chat Display /AudioMessageAttachment",
  component: AudioMessageAttachment,
} as Meta<typeof AudioMessageAttachment>;

export const Default = () => <AudioMessageAttachment src="/video.mp4" />;
