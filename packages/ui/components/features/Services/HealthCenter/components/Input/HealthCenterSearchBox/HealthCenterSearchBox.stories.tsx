import { storybookHealthCenterInputsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { HealthCenterSearchBox } from "./HealthCenterSearchBox";
import React from "react";

export default {
  title: "UI / Features /Health Center /Inputs /HealthCenterSearchBox",
  component: HealthCenterSearchBox,
} as Meta<typeof HealthCenterSearchBox>;

const template: StoryFn<typeof HealthCenterSearchBox> = (args) => {
  return <HealthCenterSearchBox {...args} />;
};

export const Default = {
  render: template,
  args: {},
};
