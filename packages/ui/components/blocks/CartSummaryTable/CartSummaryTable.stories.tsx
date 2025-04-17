import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { CartSummaryTable } from "..";

export default {
  title: "UI/blocks/CartSummaryTable",
  component: CartSummaryTable,
} as Meta<typeof CartSummaryTable>;

export const Default = {
  args: {
    items: [
      {
        id: "1",
        imageUrl: "shop-3.jpeg",
        name: "item1",
        price: 15,
        qty: 3,
        shippingMotheds: [
          {
            deliveryTime: {
              from: 5,
              to: 7,
            },
            name: "European union",
            value: "european_union",
          },
          {
            deliveryTime: {
              from: 1,
              to: 3,
            },
            name: "Click & Collect",
            value: "click_and_collect",
          },
          {
            deliveryTime: {
              from: 6,
              to: 8,
            },
            name: "International",
            value: "international",
          },
        ],
        type: "product",
      },
      {
        id: "2",
        imageUrl: "shop-3.jpeg",
        name: "item1",
        price: 15,
        qty: 3,
        shippingMotheds: [
          {
            deliveryTime: {
              from: 5,
              to: 7,
            },
            name: "European union",
            value: "european_union",
          },
          {
            deliveryTime: {
              from: 1,
              to: 3,
            },
            name: "Click & Collect",
            value: "click_and_collect",
          },
          {
            deliveryTime: {
              from: 6,
              to: 8,
            },
            name: "International",
            value: "international",
          },
        ],
        type: "service",
        location: "123 main st apt 4 atlana ga",
      },
    ],
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-white">
          <Story {...args} />
        </section>
      );
    },
  ],
};
