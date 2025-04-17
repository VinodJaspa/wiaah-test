import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { WishListIcon, Button } from "../";

export default {
  title: "UI/partials/icons/WishList",
  component: WishListIcon,
} as Meta<typeof WishListIcon>;

export const Default = {
  args: {},

  decorators: [
    (Story, { args }) => {
      return (
        <section className="flex h-screen w-full items-center justify-center gap-4 ">
          <div className="flex w-1/2 items-center gap-6">
            <Button>Add to cart</Button>
            <Story args={args} />
          </div>
        </section>
      );
    },
  ],
};
