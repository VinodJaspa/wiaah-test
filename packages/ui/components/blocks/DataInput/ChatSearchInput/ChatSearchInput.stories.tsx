import { storybookDataInputBlocksTitle } from "utils";
import { ChatSearchInput } from "@UI";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataInputBlocksTitle + "ChatSearchInput",
  component: ChatSearchInput,
} as ComponentMeta<typeof ChatSearchInput>;

export const Default = () => <ChatSearchInput />;
