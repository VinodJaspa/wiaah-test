import { Meta, StoryFn } from "@storybook/react";
import { storybookVehicleInputsTitle } from "utils";
import { VehicleDropOffDateInput } from "./VehicleDropOffDateInput";

export default {
  title: "UI / Features /Vehicle /Inputs /VehicleDropOffDateInput",
  component: VehicleDropOffDateInput,
} as Meta<typeof VehicleDropOffDateInput>;

export const Default = {
  args: {},
};
