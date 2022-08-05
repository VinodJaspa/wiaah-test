import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookVehicleInputsTitle } from "utils";
import { VehiclePickupLocationInput } from "./VehiclePickupLocationInput";

export default {
  title: storybookVehicleInputsTitle + "VehiclePickupLocationInput",
  component: VehiclePickupLocationInput,
} as ComponentMeta<typeof VehiclePickupLocationInput>;

const template: ComponentStory<typeof VehiclePickupLocationInput> = (args) => (
  <VehiclePickupLocationInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
