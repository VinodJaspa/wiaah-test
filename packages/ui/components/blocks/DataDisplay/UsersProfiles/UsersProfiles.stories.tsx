import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UsersProfiles } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Data Display/UsersProfiles",
  component: UsersProfiles,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof UsersProfiles>;

const Template: ComponentStory<typeof UsersProfiles> = (args) => (
  <UsersProfiles {...args} />
);

export const Default = Template.bind({});
Default.args = {};
