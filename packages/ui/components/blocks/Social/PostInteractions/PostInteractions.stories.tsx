import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { PostInteractions } from "@UI";
export default {
  title: "UI/blocks/Social/PostInteractions",
  component: PostInteractions,
} as Meta<typeof PostInteractions>;

const Template: StoryFn<typeof PostInteractions> = (args) => (
  <div className="w-96">
    <PostInteractions {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    comments: 24,
    likes: 150,
    shares: 11,
  },
};

export const WithHighNumbers = {
  render: Template,

  args: {
    comments: 1500,
    likes: 1000000,
    shares: 11,
  },
};
