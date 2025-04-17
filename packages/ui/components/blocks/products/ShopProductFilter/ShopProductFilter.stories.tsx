import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ShopProductFilter } from "../";

export default {
  title: "UI/blocks/products/ShopProductFilter",
  component: ShopProductFilter,
} as Meta<typeof ShopProductFilter>;

export const Default = {
  args: {
    colors: ["#920", "#059", "#229"],
    locations: ["USA", "FR", "UK"],
    rating: true,
    shipping: ["Click and Collect", "Free", "International"],
  },

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center bg-slate-200">
          <Story {...args} />
        </section>
      );
    },
  ],
};
