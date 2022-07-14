import { storybookSearchInputs } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HealthCenterSearchBox } from "./HealthCenterSearchBox";
import React from "react";

export default {
  title: storybookSearchInputs + "HealthCenterSearchBox",
  component: HealthCenterSearchBox,
} as ComponentMeta<typeof HealthCenterSearchBox>;

const template: ComponentStory<typeof HealthCenterSearchBox> = (args) => {
  return <HealthCenterSearchBox {...args} />;
};

export const Default = template.bind({});
Default.args = {};
