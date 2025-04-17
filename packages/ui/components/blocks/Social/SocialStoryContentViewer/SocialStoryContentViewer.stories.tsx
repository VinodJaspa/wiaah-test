import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SocialStoryContentViewer } from "@UI";
export default {
  title: "UI/blocks/Social/SocialStoryContentViewer",
  component: SocialStoryContentViewer,
} as Meta<typeof SocialStoryContentViewer>;

export const WithText = {
  args: {
    storyType: "text",
    storyText: "Hello",
  },
};

export const WithImage = {
  args: {
    storyType: "image",
    storySrc: "/shop.jpeg",
  },
};

export const WithImageAndText = {
  args: {
    storyType: "image",
    storySrc: "/shop.jpeg",
    storyText: "test text",
  },
};

export const WithVideo = {
  args: {
    storyType: "video",
    storySrc: "/video.mp4",
  },
};

export const WithVerticalVideo = {
  args: {
    storyType: "video",
    storySrc: "/verticalVideo.mp4",
  },
};

export const WithVerticalImage = {
  args: {
    storyType: "image",
    storySrc: "/verticalImage.jpg",
  },
};
