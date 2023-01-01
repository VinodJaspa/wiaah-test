import { ChatMessagesPH, storybookChatDisplay, ChatRoomContent } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookChatDisplay + "ChatRoomContent",
  component: ChatRoomContent,
} as ComponentMeta<typeof ChatRoomContent>;

export const Default = () => <ChatRoomContent messages={ChatMessagesPH} />;
