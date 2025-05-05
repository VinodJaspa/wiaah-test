import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SocialStoriesCarousel } from "@UI";
export default {
  title: "UI/blocks/Social/SocialStoriesCarousel",
  component: SocialStoriesCarousel,
} as Meta<typeof SocialStoriesCarousel>;

const Template: StoryFn<typeof SocialStoriesCarousel> = (args) => (
  <div className="w-1/2">
    <SocialStoriesCarousel {...args} />
  </div>
);

export const Default = {
  render: Template,

  args: {
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
  },
};

export const WithVerticalStories = {
  render: Template,

  args: {
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
  },
};
