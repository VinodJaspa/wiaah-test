import { Meta, StoryFn } from "@storybook/react";
import { storybookVehicleListsTitle } from "utils";
import { VehicleProprtiesList } from "./VehicleProprtiesList";

export default {
  title: "UI / Features /Vehicle /Lists /VehiclePropertiesList",
  component: VehicleProprtiesList,
} as Meta<typeof VehicleProprtiesList>;

export const Default = {
  args: {
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
  },
};
