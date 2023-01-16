import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostCommentCard } from "@UI";
import { PostCommentPlaceholder } from "placeholder";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";

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
