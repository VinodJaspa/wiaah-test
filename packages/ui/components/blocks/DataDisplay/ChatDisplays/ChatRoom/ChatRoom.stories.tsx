import { storybookChatDisplay, ChatRoom } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Chat Display /ChatRoom",
  component: ChatRoom,
} as Meta<typeof ChatRoom>;

export const Default = () => <ChatRoom roomId="132" />;
