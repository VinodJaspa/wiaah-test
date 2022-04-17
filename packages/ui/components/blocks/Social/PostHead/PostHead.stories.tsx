import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostHead } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
import { PostCardPlaceHolder } from "../../../../placeholder";
export default {
  title: "UI/blocks/Social/PostHead",
  component: PostHead,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof PostHead>;

const Template: ComponentStory<typeof PostHead> = (args) => (
  <PostHead {...args} />
);

export const Default = Template.bind({});
Default.args = {
  creatorName: PostCardPlaceHolder.profileInfo.name,
  createdAt: PostCardPlaceHolder.postInfo.createdAt,
  creatorPhoto: PostCardPlaceHolder.profileInfo.thumbnail,
};
export const newStory = Template.bind({});
newStory.args = {
  newStory: true,
  creatorName: PostCardPlaceHolder.profileInfo.name,
  createdAt: PostCardPlaceHolder.postInfo.createdAt,
  creatorPhoto: PostCardPlaceHolder.profileInfo.thumbnail,
};
