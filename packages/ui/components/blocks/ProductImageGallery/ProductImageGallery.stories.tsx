import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ProductImageGallery } from "../index";

export default {
  title: "UI/blocks/ProductImageGallery",
  component: ProductImageGallery,
} as Meta<typeof ProductImageGallery>;

export const Default = {
  args: {
    images: [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
        type: "image",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
        type: "image",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
        type: "image",
      },
      {
        original: "https://picsum.photos/id/1020/1000/600/",
        thumbnail: "https://picsum.photos/id/1020/250/150/",
        type: "image",
      },
    ],
  },
};
