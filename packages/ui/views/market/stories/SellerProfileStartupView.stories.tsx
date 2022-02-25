import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SellerProfileStartupView } from "../index";
export default {
  title: "UI/View/Market/SellerProfileStartupView",
  component: SellerProfileStartupView,
} as ComponentMeta<typeof SellerProfileStartupView>;

const Template: ComponentStory<typeof SellerProfileStartupView> = (args) => (
  <SellerProfileStartupView {...args} />
);

export const Default = Template.bind({});
Default.args = {};
