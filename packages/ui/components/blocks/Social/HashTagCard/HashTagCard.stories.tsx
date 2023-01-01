import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HashTagCard } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/HashTagCard",
  component: HashTagCard,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof HashTagCard>;

const Template: ComponentStory<typeof HashTagCard> = (args) => (
  <HashTagCard {...args} />
);

export const imagePost = Template.bind({});
imagePost.args = {
  attachment: {
    src: "/shop.jpeg",
    type: "image",
  },
  title: "most viewed post",
};

export const videoPost = Template.bind({});
videoPost.args = {
  attachment: {
    src: "video.mp4",
    type: "video",
  },
  title: "most viewed video",
};
