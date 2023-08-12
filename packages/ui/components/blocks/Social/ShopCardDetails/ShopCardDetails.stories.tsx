import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShopCardDetails } from "@UI";
import { shopCardInfoPlaceholder } from "placeholder";
export default {
  title: "UI/blocks/Social/ShopCardDetails",
  component: ShopCardDetails,
} as ComponentMeta<typeof ShopCardDetails>;

const Template: ComponentStory<typeof ShopCardDetails> = (args) => (
  <ShopCardDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...shopCardInfoPlaceholder,
};
export const WithHighNumbers = Template.bind({});
WithHighNumbers.args = {
  ...shopCardInfoPlaceholder,
  views: 2700000,
};
