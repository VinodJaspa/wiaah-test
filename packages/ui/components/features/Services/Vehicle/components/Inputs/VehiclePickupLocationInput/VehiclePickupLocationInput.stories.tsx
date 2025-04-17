import { Meta, StoryFn } from "@storybook/react";
import { storybookVehicleInputsTitle } from "utils";
import { VehiclePickupLocationInput } from "./VehiclePickupLocationInput";

export default {
  title: "UI / Features /Vehicle /Inputs /VehiclePickupLocationInput",
  component: VehiclePickupLocationInput,
} as Meta<typeof VehiclePickupLocationInput>;

export const Default = {
  args: {},
};
