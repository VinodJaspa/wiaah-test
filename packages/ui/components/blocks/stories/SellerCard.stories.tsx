import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SellerCard } from "../index";
export default {
  title: "UI/blocks/SellerCard",
  component: SellerCard,
  argTypes: {
    name: { control: "text" },
    reviews: { control: "number" },
    rating: { control: "number" },
  },
} as ComponentMeta<typeof SellerCard>;

const Template: ComponentStory<typeof SellerCard> = (args) => (
  <SellerCard {...args} />
);

export const Default = Template.bind({});
Default.args = {};
