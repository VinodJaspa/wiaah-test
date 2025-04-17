import { Meta, StoryFn } from "@storybook/react";
import { PostCommentPlaceholder } from "placeholder";
import { PostReplyCard } from ".";

export default {
  title: "UI/blocks/Social/ReplyCard",
  component: PostReplyCard,
} as Meta<typeof PostReplyCard>;

export const Default = {
  args: {
    ...PostCommentPlaceholder,
  },
};
