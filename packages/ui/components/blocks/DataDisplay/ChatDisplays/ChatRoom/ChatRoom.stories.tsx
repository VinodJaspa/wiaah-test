import { storybookChatDisplay, ChatRoom } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookChatDisplay + "ChatRoom",
  component: ChatRoom,
} as ComponentMeta<typeof ChatRoom>;

export const Default = () => <ChatRoom roomId="132" />;
