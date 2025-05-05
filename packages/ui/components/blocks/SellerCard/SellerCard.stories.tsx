import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { SellerCard } from "../index";
export default {
  title: "UI/blocks/SellerCard",
  component: SellerCard,
  argTypes: {
    name: { control: "text" },
    reviews: { control: "number" },
    rating: { control: "number" },
  },
} as Meta<typeof SellerCard>;

export const Default = {
  args: {},
};
