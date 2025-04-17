import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { PostCard } from "@UI";
import { PostCardPlaceHolder } from "placeholder";
export default {
  title: "UI/blocks/Social/PostCard",
  component: PostCard,
} as Meta<typeof PostCard>;

const Template: StoryFn<typeof PostCard> = (args) => (
  <div className="w-96 h-96">
    <PostCard {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
    ...PostCardPlaceHolder,
  },
};
