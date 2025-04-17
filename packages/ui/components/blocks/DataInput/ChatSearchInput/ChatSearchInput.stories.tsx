import { storybookDataInputBlocksTitle } from "utils";
import { ChatSearchInput } from "@UI";
import { Meta } from "@storybook/react";

export default {
  title: "UI / blocks / Data Input /ChatSearchInput",
  component: ChatSearchInput,
} as Meta<typeof ChatSearchInput>;

export const Default = () => <ChatSearchInput />;
