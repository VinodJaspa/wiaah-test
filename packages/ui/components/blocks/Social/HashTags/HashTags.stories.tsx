import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HashTags } from "@UI";
export default {
  title: "UI/blocks/Social/HashTags",
  component: HashTags,
} as ComponentMeta<typeof HashTags>;

const Template: ComponentStory<typeof HashTags> = (args) => (
  <HashTags {...args} />
);

export const Default = Template.bind({});
Default.args = {
  color: "primary.main",
  tags: ["mood", "fun", "gaming"],
};
