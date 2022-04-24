import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ActionHeader } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Data Display/ActionHeader",
  component: ActionHeader,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof ActionHeader>;

const Template: ComponentStory<typeof ActionHeader> = (args) => (
  <ActionHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userName: "Wiaah",
  userThumbnail: "/wiaah_logo.png",
  actionTitle: "test video title for test purposes",
};
export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
  userName: "Wiaah",
  userThumbnail: "/wiaah_logo.png",
  actionTitle:
    "test video title for test purposes test video title for test purposes test video title for test purposes test video title for test purposes test video title for test purposes ",
};

export const WithHashTags = Template.bind({});
WithHashTags.args = {
  userName: "Wiaah",
  userThumbnail: "/wiaah_logo.png",
  actionTitle: "test video title for test purposes",
  actionHashtags: ["fun", "gaming", "development"],
};
