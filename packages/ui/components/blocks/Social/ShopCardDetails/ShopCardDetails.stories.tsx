import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShopCardDetails } from "ui";
import { shopCardInfoPlaceholder } from "ui/placeholder";
import ChakraUiDecorator from "ui/SBDecorators/ChakraUiDecorator";
export default {
  title: "UI/blocks/Social/ShopCardDetails",
  component: ShopCardDetails,
  decorators: [ChakraUiDecorator],
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
