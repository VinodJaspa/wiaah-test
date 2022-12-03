import { storybookVehicleInputsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VehicleSearchBox } from "./VehicleSearchBox";
import React from "react";

export default {
  title: storybookVehicleInputsTitle + "VehicleSearchBox",
  component: VehicleSearchBox,
} as ComponentMeta<typeof VehicleSearchBox>;

const template: ComponentStory<typeof VehicleSearchBox> = (args) => (
  <VehicleSearchBox {...args} />
);

export const Default = template.bind({});
Default.args = {};
