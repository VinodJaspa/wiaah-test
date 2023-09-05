import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostInteractions } from "@UI";
export default {
  title: "UI/blocks/Social/PostInteractions",
  component: PostInteractions,
} as ComponentMeta<typeof PostInteractions>;

const Template: ComponentStory<typeof PostInteractions> = (args) => (
  <div className="w-96">
    <PostInteractions {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  comments: 24,
  likes: 150,
  shares: 11,
};

export const WithHighNumbers = Template.bind({});
WithHighNumbers.args = {
  comments: 1500,
  likes: 1000000,
  shares: 11,
};
