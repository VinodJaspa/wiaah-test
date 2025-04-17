import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import { BuyerComment } from "@UI";
export default {
  title: "UI/blocks/BuyerComment",
  component: BuyerComment,
} as Meta<typeof BuyerComment>;

export const Default = {
  args: {
    name: "John",
    date: new Date("08-Oct-2020"),
    rating: 4,
    comment: "Really great product highly recommand it",
    product: {
      name: "Pink Wiaah Dress",
      description: "Beautiful silk dress",
      thumbnailUrl: "/shop-2.jpeg",
    },
  },

  decorators: [
    (Story, { args }) => (
      <section className=" flex flex-col items-center justify-center bg-slate-200">
        <Story args={args} />
      </section>
    ),
  ],
};
