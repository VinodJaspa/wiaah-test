import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PostAttachment } from "@UI";
export default {
  title: "UI/blocks/Social/PostAttachment",
  component: PostAttachment,
} as ComponentMeta<typeof PostAttachment>;

const Template: ComponentStory<typeof PostAttachment> = (args) => (
  <PostAttachment {...args} />
);

export const ImageAttachment = Template.bind({});
ImageAttachment.args = {
  src: "/verticalImage.jpg",
  alt: "image",
  type: "image",
};
export const VideoAttachment = Template.bind({});
VideoAttachment.args = {
  src: "/verticalVideo.mp4",
  alt: "video",
  type: "video",
};
