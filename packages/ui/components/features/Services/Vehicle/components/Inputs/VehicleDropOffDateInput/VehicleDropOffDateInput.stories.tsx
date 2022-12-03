import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookVehicleInputsTitle } from "utils";
import { VehicleDropOffDateInput } from "./VehicleDropOffDateInput";

export default {
  title: storybookVehicleInputsTitle + "VehicleDropOffDateInput",
  component: VehicleDropOffDateInput,
} as ComponentMeta<typeof VehicleDropOffDateInput>;

const template: ComponentStory<typeof VehicleDropOffDateInput> = (args) => (
  <VehicleDropOffDateInput {...args} />
);

export const Default = template.bind({});
Default.args = {};
