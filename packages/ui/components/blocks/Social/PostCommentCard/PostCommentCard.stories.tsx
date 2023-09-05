import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostCommentCard } from "@UI";
import { PostCommentPlaceholder } from "placeholder";

export default {
  title: "UI/blocks/Social/CommentCard",
  component: PostCommentCard,
} as ComponentMeta<typeof PostCommentCard>;

const Template: ComponentStory<typeof PostCommentCard> = (args) => (
  <PostCommentCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...PostCommentPlaceholder,
};
