import { storybookDataInputBlocksTitle } from "utils";
import { ChatSearchInput } from "ui";
import { ComponentMeta } from "@storybook/react";

export default {
  title: storybookDataInputBlocksTitle + "ChatSearchInput",
  component: ChatSearchInput,
} as ComponentMeta<typeof ChatSearchInput>;

export const Default = () => <ChatSearchInput />;
