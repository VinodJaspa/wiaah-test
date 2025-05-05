import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { PostCommentCard } from "@UI";
import { PostCommentPlaceholder } from "placeholder";

export default {
  title: "UI/blocks/Social/CommentCard",
  component: PostCommentCard,
} as Meta<typeof PostCommentCard>;

export const Default = {
  args: {
    ...PostCommentPlaceholder,
  },
};
