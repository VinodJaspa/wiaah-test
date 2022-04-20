import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialStoryContentViewer } from "ui";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/SocialStoryContentViewer",
  component: SocialStoryContentViewer,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SocialStoryContentViewer>;

const Template: ComponentStory<typeof SocialStoryContentViewer> = (args) => (
  <SocialStoryContentViewer {...args} />
);

export const WithText = Template.bind({});
WithText.args = {
  storyType: "text",
  storyText: "Hello",
};

export const WithImage = Template.bind({});
WithImage.args = {
  storyType: "image",
  storySrc: "/shop.jpeg",
};
export const WithImageAndText = Template.bind({});
WithImageAndText.args = {
  storyType: "image",
  storySrc: "/shop.jpeg",
  storyText: "test text",
};
export const WithVideo = Template.bind({});
WithVideo.args = {
  storyType: "video",
  storySrc: "/video.mp4",
};
export const WithVerticalVideo = Template.bind({});
WithVerticalVideo.args = {
  storyType: "video",
  storySrc: "/verticalVideo.mp4",
};

export const WithVerticalImage = Template.bind({});
WithVerticalImage.args = {
  storyType: "image",
  storySrc: "/verticalImage.jpg",
};
