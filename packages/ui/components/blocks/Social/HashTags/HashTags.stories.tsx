import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HashTags } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/HashTags",
  component: HashTags,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof HashTags>;

const Template: ComponentStory<typeof HashTags> = (args) => (
  <HashTags {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: "primary.main",
  tags: ["mood", "fun", "gaming"],
};
