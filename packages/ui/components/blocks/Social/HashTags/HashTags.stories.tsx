import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { HashTags } from "@UI";
export default {
  title: "UI/blocks/Social/HashTags",
  component: HashTags,
} as Meta<typeof HashTags>;

export const Default = {
  args: {
    color: "primary.main",
    tags: ["mood", "fun", "gaming"],
  },
};
