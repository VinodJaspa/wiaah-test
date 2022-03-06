import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HomeView } from "ui/views";
export default {
  title: "UI/View/Market/Home",
  component: HomeView,
} as ComponentMeta<typeof HomeView>;

const Template: ComponentStory<typeof HomeView> = (args) => (
  <HomeView {...args} />
);

export const Default = Template.bind({});
Default.args = {};
