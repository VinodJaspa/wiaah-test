import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BuyerProfileStartUpView } from "../BuyerProfileStartupView";
export default {
  title: "UI/View/Market/BuyerProfileStartUpView",
  component: BuyerProfileStartUpView,
} as ComponentMeta<typeof BuyerProfileStartUpView>;

const Template: ComponentStory<typeof BuyerProfileStartUpView> = (args) => (
  <BuyerProfileStartUpView {...args} />
);

export const Default = Template.bind({});
Default.args = {};
