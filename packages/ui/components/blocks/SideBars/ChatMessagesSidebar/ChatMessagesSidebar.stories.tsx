import { ChatMessagesSideBar } from "./index";
import { Meta, StoryFn } from "@storybook/react";
import { storybookSidebarsTitle } from "utils";
import { ChatMessage } from "../../DataDisplay";

export default {
  title: "UI / Blocks / SideBars /ChatMessageSideBar",
  component: ChatMessagesSideBar,
} as Meta<typeof ChatMessage>;

export const Default = {
  args: {},
};
