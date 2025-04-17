import { ChatMessagesPH, storybookChatDisplay, ChatRoomContent } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Chat Display /ChatRoomContent",
  component: ChatRoomContent,
} as Meta<typeof ChatRoomContent>;

export const Default = () => <ChatRoomContent messages={ChatMessagesPH} />;
