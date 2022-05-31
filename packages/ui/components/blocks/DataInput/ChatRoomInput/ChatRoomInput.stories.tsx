import { storybookDataInputBlocksTitle } from "utils";
import { ChatRoomInput } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataInputBlocksTitle + "ChatRoomInput",
  component: ChatRoomInput,
} as ComponentMeta<typeof ChatRoomInput>;

export const Default = () => <ChatRoomInput />;
