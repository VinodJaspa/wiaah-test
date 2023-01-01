import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BuyerComment } from "@UI";
export default {
  title: "UI/blocks/BuyerComment",
  component: BuyerComment,
} as ComponentMeta<typeof BuyerComment>;

const Template: ComponentStory<typeof BuyerComment> = (args) => (
  <BuyerComment {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: "John",
  date: new Date("08-Oct-2020"),
  rating: 4,
  comment: "Really great product highly recommand it",
  product: {
    name: "Pink Wiaah Dress",
    description: "Beautiful silk dress",
    thumbnailUrl: "/shop-2.jpeg",
  },
};

Default.decorators = [
  (Story, { args }) => (
    <section className=" flex flex-col items-center justify-center bg-slate-200">
      <Story args={args} />
    </section>
  ),
];
