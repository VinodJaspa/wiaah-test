import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { PostAttachment } from "@UI";
export default {
  title: "UI/blocks/Social/PostAttachment",
  component: PostAttachment,
} as Meta<typeof PostAttachment>;

export const ImageAttachment = {
  args: {
    src: "/verticalImage.jpg",
    alt: "image",
    type: "image",
  },
};

export const VideoAttachment = {
  args: {
    src: "/verticalVideo.mp4",
    alt: "video",
    type: "video",
  },
};
