import { ChatMessagesSideBar } from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookSidebarsTitle } from "utils";
import { ChatMessage } from "../../DataDisplay";

export default {
  title: storybookSidebarsTitle + "ChatMessageSideBar",
  component: ChatMessagesSideBar,
} as ComponentMeta<typeof ChatMessage>;

const template: ComponentStory<typeof ChatMessagesSideBar> = (args) => (
  <ChatMessagesSideBar {...args} />
);

export const Default = template.bind({});
Default.args = {};
