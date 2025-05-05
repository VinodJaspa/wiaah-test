import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ProductViewRight } from "../index";
export default {
  title: "UI/blocks/ProductViewRight",
  component: ProductViewRight,
  argTypes: {
    name: { control: "text" },
    rating: { control: "number" },
    reviews: { control: "number" },
    price: { control: "number" },
    oldPrice: { control: "number" },
    off: { control: "number" },
  },
} as Meta<typeof ProductViewRight>;

export const Default = {
  args: {},
};
