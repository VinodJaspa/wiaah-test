import { Meta, StoryFn } from "@storybook/react";
import { storybookVehicleInputsTitle } from "utils";
import { VehiclePickupDateInput } from "./VehiclePickupDateInput";

export default {
  title: "UI / Features /Vehicle /Inputs /VehiclePickupDateInput",
  component: VehiclePickupDateInput,
} as Meta<typeof VehiclePickupDateInput>;

export const Default = {
  args: {},
};
