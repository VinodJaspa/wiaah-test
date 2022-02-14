import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Search from "../search";
export default {
  title: "Market/Search Results",
  component: Search,
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {};
