import {
  ChatRoomHeaderDataPH,
  storybookChatDisplay,
  ChatRoomHeader,
} from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Chat Display /ChatRoomHeader",
  component: ChatRoomHeader,
} as Meta<typeof ChatRoomHeader>;

export const Default = () => <ChatRoomHeader data={ChatRoomHeaderDataPH} />;
