import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ShopCardDetails } from "@UI";
import { shopCardInfoPlaceholder } from "placeholder";
export default {
  title: "UI/blocks/Social/ShopCardDetails",
  component: ShopCardDetails,
} as Meta<typeof ShopCardDetails>;

export const Default = {
  args: {
    ...shopCardInfoPlaceholder,
  },
};

export const WithHighNumbers = {
  args: {
    ...shopCardInfoPlaceholder,
    views: 2700000,
  },
};
