import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookVehicleInputsTitle } from "utils";
import { VehiclePickupTimeInput } from "./VehiclePickupTimeInput";

export default {
  title: storybookVehicleInputsTitle + "VehiclePickupTimeInput",
  component: VehiclePickupTimeInput,
} as ComponentMeta<typeof VehiclePickupTimeInput>;

const template: ComponentStory<typeof VehiclePickupTimeInput> = (args) => (
  <VehiclePickupTimeInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
