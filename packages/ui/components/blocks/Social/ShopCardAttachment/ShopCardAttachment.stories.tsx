import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShopCardAttachment } from "@UI";
import { shopCardInfoPlaceholder } from "../../../../placeholder";
export default {
  title: "UI/blocks/Social/ShopCardAttachment",
  component: ShopCardAttachment,
} as ComponentMeta<typeof ShopCardAttachment>;

const Template: ComponentStory<typeof ShopCardAttachment> = (args) => (
  <ShopCardAttachment {...args} />
);

const { attachments, cashback, discount, type } = shopCardInfoPlaceholder;

export const ImageAttachment = Template.bind({});
ImageAttachment.args = {
  src: "/shop.jpeg",
  type: "image",
  cashback,
  discount,
  productType: "service",
};
export const VideoAttachment = Template.bind({});
VideoAttachment.args = {
  ...attachments,
  src: "/video.mp4",
  type: "video",
  cashback,
  discount,
  productType: "product",
};
export const serviceWithBookEnabled = Template.bind({});
serviceWithBookEnabled.args = {
  src: "/shop.jpeg",
  type: "image",
  cashback,
  discount,
  showbook: true,
  productType: "service",
};
