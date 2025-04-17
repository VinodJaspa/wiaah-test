import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ShopCardAttachment } from "@UI";
import { shopCardInfoPlaceholder } from "../../../../placeholder";
export default {
  title: "UI/blocks/Social/ShopCardAttachment",
  component: ShopCardAttachment,
} as Meta<typeof ShopCardAttachment>;

const { attachments, cashback, discount, type } = shopCardInfoPlaceholder;

export const ImageAttachment = {
  args: {
    src: "/shop.jpeg",
    type: "image",
    cashback,
    discount,
    productType: "service",
  },
};

export const VideoAttachment = {
  args: {
    ...attachments,
    src: "/video.mp4",
    type: "video",
    cashback,
    discount,
    productType: "product",
  },
};

export const serviceWithBookEnabled = {
  args: {
    src: "/shop.jpeg",
    type: "image",
    cashback,
    discount,
    showbook: true,
    productType: "service",
  },
};
