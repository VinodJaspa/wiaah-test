import React from "react";
import { value ComponentStory, value ComponentMeta } from "@storybook/react";
import { value ProductDescription } from "../index";

export default {
  title: "UI/blocks/ProductDescription",
  component: ProductDescription,
} as ComponentMeta<typeof ProductDescription>;

const Template: ComponentStory<typeof ProductDescription> = (args) => (
  <ProductDescription {...args} />
);

export const Default = Template.bind({});
Default.args = {
  description:
    'Product <b class="text-blue-400">Full description</b> goe here in <b class="text-red-400" > HTML </b> format for <b class="green-text">styling purpose.</b>',
  comments: [
    {
      name: "Rehan",
      date: "08-Oct-2020",
      rating: 5,
      comment: "Good product",
    },
    {
      name: "John",
      date: "08-Oct-2020",
      rating: 3,
      comment: "Really great product highly recommand it",
    },
    {
      name: "Jane",
      date: "08-Oct-2020",
      rating: 4,
      comment: "Amazing!!!",
    },
    {
      name: "Rehan",
      date: "08-Oct-2020",
      rating: 5,
      comment: "Good product",
    },
    {
      name: "John",
      date: "08-Oct-2020",
      rating: 3,
      comment: "Really great product highly recommand it",
    },
  ],
};
