import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { HashTagCard } from "@UI";
export default {
  title: "UI/blocks/Social/HashTagCard",
  component: HashTagCard,
} as Meta<typeof HashTagCard>;

export const imagePost = {
  args: {
    attachment: {
      src: "/shop.jpeg",
      type: "image",
    },
    title: "most viewed post",
  },
};

export const videoPost = {
  args: {
    attachment: {
      src: "video.mp4",
      type: "video",
    },
    title: "most viewed video",
  },
};
