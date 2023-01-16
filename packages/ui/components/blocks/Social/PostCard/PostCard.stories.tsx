import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostCard } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
import { PostCardPlaceHolder } from "placeholder";
export default {
  title: "UI/blocks/Social/PostCard",
  component: PostCard,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof PostCard>;

const Template: ComponentStory<typeof PostCard> = (args) => (
  <div className="w-96 h-96">
    <PostCard {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...PostCardPlaceHolder,
};
