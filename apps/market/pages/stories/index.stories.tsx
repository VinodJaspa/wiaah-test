import React from "react";
import { value ComponentStory, value ComponentMeta } from "@storybook/react";
import Market from "../index";
export default {
  title: "Market/Home",
  component: Market,
} as ComponentMeta<typeof Market>;

const Template: ComponentStory<typeof Market> = (args) => <Market {...args} />;

export const Default = Template.bind({});
Default.args = {};
