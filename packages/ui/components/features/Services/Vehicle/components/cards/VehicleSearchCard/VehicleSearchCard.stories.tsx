import { storybookVehicleCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VehicleSearchCard, VehicleSearchCardProps } from "./VehicleSearchCard";
import React from "react";

export default {
  title: storybookVehicleCardsTitle + "VehicleSearchCard",
  component: VehicleSearchCard,
} as ComponentMeta<typeof VehicleSearchCard>;

const template: ComponentStory<typeof VehicleSearchCard> = (args) => (
  <div className="w-96">
    <VehicleSearchCard {...args} />
  </div>
);

export const Default: { args: VehicleSearchCardProps } = template.bind({});
Default.args = {
  name: "Lucky Dip Car",
  pricePerDay: 111,
  thumbnail:
    "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/1_rangerover_tracking.jpg",

  vehicleProps: [
    {
      type: "a/c",
      value: true,
    },
    {
      type: "gps",
      value: true,
    },
    {
      type: "passengers",
      value: 5,
    },
    {
      type: "windows",
      value: 4,
    },
    {
      type: "bags",
      value: 3,
    },
  ],
};
