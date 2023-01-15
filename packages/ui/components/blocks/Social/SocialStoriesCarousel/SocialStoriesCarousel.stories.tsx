import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialStoriesCarousel } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
import { PostCardPlaceHolder } placeholder;
export default {
  title: "UI/blocks/Social/SocialStoriesCarousel",
  component: SocialStoriesCarousel,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof SocialStoriesCarousel>;

const Template: ComponentStory<typeof SocialStoriesCarousel> = (args) => (
  <div className="w-1/2">
    <SocialStoriesCarousel {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  stories: [
    {
      id: "1",
      storyType: "text",
      storyText: "test text",
    },
    {
      id: "2",
      storyType: "image",
      storySrc: "/shop-2.jpeg",
      storyText: "test text",
    },
    {
      id: "3",
      storyType: "video",
      storySrc: "/video.mp4",
      storyText: "test text",
    },
  ],
};
export const WithVerticalStories = Template.bind({});
WithVerticalStories.args = {
  stories: [
    {
      id: "1",
      storyType: "text",
      storyText: "test text",
    },
    {
      id: "2",
      storyType: "image",
      storySrc: "/verticalImage.jpg",
      storyText: "test text",
    },
    {
      id: "3",
      storyType: "video",
      storySrc: "/verticalVideo.mp4",
      storyText: "test text",
    },
  ],
};
