import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookVehicleInputsTitle } from "utils";
import { VehiclePickupDateInput } from "./VehiclePickupDateInput";

export default {
  title: storybookVehicleInputsTitle + "VehiclePickupDateInput",
  component: VehiclePickupDateInput,
} as ComponentMeta<typeof VehiclePickupDateInput>;

const template: ComponentStory<typeof VehiclePickupDateInput> = (args) => (
  <VehiclePickupDateInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
