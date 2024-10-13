import {
  ChatRoomHeaderDataPH,
  storybookChatDisplay,
  ChatRoomHeader,
} from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookChatDisplay + "ChatRoomHeader",
  component: ChatRoomHeader,
} as ComponentMeta<typeof ChatRoomHeader>;

export const Default = () => <ChatRoomHeader data={ChatRoomHeaderDataPH} />;
