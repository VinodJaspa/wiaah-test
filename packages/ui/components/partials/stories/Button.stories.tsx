import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../index";

export default {
  title: "UI/partials/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Login",
};

export const ColoredBackground = Template.bind({});
ColoredBackground.args = {
  hexBackgroundColor: "#009fd4",
  text: "Login",
};

export const Outlined = Template.bind({});
Outlined.args = {
  text: "new to Wiaah ?",
  hexTextColor: "#000",
  outlined: true,
};
