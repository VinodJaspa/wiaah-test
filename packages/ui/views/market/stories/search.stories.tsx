import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SearchView } from "ui/views";
export default {
  title: "UI/View/Market/Search Results",
  component: SearchView,
} as ComponentMeta<typeof SearchView>;

const Template: ComponentStory<typeof SearchView> = (args) => (
  <SearchView {...args} />
);

export const Default = Template.bind({});
Default.args = {};
