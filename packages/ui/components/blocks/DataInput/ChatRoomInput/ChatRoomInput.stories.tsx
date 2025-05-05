import { storybookDataInputBlocksTitle } from "utils";
import { ChatRoomInput } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Input /ChatRoomInput",
  component: ChatRoomInput,
} as Meta<typeof ChatRoomInput>;

export const Default = () => <ChatRoomInput roomId="2" />;
