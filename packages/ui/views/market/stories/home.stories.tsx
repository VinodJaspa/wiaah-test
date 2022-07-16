import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HomeView } from "ui/views";
import { Main } from "../Main";

export default {
  title: "UI/View/Market/Home",
  component: Main,
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = (args) => <Main {...args} />;

export const Default = Template.bind({});
Default.args = {};
