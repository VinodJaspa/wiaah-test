import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShopCardAttachment } from "@UI";
import ChakraUiDecorator from "@UI/SBDecorators/ChakraUiDecorator";
import { shopCardInfoPlaceholder } from "../../../../placeholder";
export default {
  title: "UI/blocks/Social/ShopCardAttachment",
  component: ShopCardAttachment,
  decorators: [ChakraUiDecorator],
} as ComponentMeta<typeof ShopCardAttachment>;

const Template: ComponentStory<typeof ShopCardAttachment> = (args) => (
  <ShopCardAttachment {...args} />
);

const { attachment, cashback, discount, type } = shopCardInfoPlaceholder;

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
  ...attachment,
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
