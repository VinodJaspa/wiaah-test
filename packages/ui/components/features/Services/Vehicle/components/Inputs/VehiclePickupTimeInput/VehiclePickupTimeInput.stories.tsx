import { Meta, StoryFn } from "@storybook/react";
import { storybookVehicleInputsTitle } from "utils";
import { VehiclePickupTimeInput } from "./VehiclePickupTimeInput";

export default {
  title: "UI / Features /Vehicle /Inputs /VehiclePickupTimeInput",
  component: VehiclePickupTimeInput,
} as Meta<typeof VehiclePickupTimeInput>;

export const Default = {
  args: {},
};
