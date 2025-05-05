import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { ShippingMotheds } from "../";
import { shippingMotheds } from "../../../placeholder";
export default {
  title: "UI/blocks/ShippingMotheds",
  component: ShippingMotheds,
} as Meta<typeof ShippingMotheds>;

export const Default = {
  args: {
    motheds: shippingMotheds,
  },

  decorators: [
    (Story, { args }) => (
      <section className="flex h-screen w-full flex-col items-center justify-center bg-slate-200">
        <Story args={args} />
      </section>
    ),
  ],
};
