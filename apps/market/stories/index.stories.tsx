import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Market from "../pages/index";
export default {
  title: "Market/Home",
  component: Market,
} as ComponentMeta<typeof Market>;

const Template: ComponentStory<typeof Market> = (args) => <Market {...args} />;

export const Default = Template.bind({});
Default.args = {};
