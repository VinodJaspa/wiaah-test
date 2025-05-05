import { storybookVehicleInputsTitle } from "utils";
import { Meta, StoryFn } from "@storybook/react";
import { VehicleSearchBox } from "./VehicleSearchBox";
import React from "react";

export default {
  title: "UI / Features /Vehicle /Inputs /VehicleSearchBox",
  component: VehicleSearchBox,
} as Meta<typeof VehicleSearchBox>;

export const Default = {
  args: {},
};
