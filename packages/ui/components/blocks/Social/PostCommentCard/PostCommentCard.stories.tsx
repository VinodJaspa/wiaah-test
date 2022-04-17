import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostCommentCard } from "ui";
import { PostCommentPlaceholder } from "ui/placeholder";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";

export default {
  title: "UI/blocks/Social/CommentCard",
  component: PostCommentCard,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof PostCommentCard>;

const Template: ComponentStory<typeof PostCommentCard> = (args) => (
  <PostCommentCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...PostCommentPlaceholder,
};
