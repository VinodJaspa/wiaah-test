import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookVehicleListsTitle } from "utils";
import { VehicleProprtiesList } from "./VehicleProprtiesList";

export default {
  title: storybookVehicleListsTitle + "VehiclePropertiesList",
  component: VehicleProprtiesList,
} as ComponentMeta<typeof VehicleProprtiesList>;

const template: ComponentStory<typeof VehicleProprtiesList> = (args) => (
  <VehicleProprtiesList {...args} />
);

export const Default = template.bind({});
Default.args = {
  VehicleProps: [
    {
      type: "a/c",
      value: true,
    },
    {
      type: "bags",
      value: 5,
    },
    {
      type: "gps",
      value: true,
    },
    {
      type: "passengers",
      value: 4,
    },
    {
      type: "windows",
      value: 4,
    },
  ],
};
