import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
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
} as ComponentMeta<typeof ProductViewRight>;

const Template: ComponentStory<typeof ProductViewRight> = (args) => (
  <ProductViewRight {...args} />
);

export const Default = Template.bind({});
Default.args = {};
