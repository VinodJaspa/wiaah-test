import { storybookVehicleCardsTitle } from "utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VehicleSearchCard, VehicleSearchCardProps } from "./VehicleSearchCard";
import React from "react";
import { ServicePresentationType } from "@features/API/gql/generated";

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
  __typename: "Vehicle",
  id: "vehicle-1",
  title: "Sedan 2024",
  presentations: [
    {
      __typename: "ServicePresentation",
      type: ServicePresentationType.Img, // Replace with a valid ServicePresentationType value
      src: "https://example.com/image.jpg", // Replace with a valid image URL
    },
  ],
  brand: "Toyota",
  model: "Camry",
  price: 30000,
  cancelationPolicies: [
    {
      __typename: "ServiceCancelationPolicy",
      duration: 14, // Duration in days
      cost: 100, // Cost of cancellation
    },
  ],
  properties: {
    __typename: "VehicleProperties",
    seats: 5,
    windows: 6,
    maxSpeedInKm: 240,
    lugaggeCapacity: 450,
    gpsAvailable: true,
    airCondition: true,
  },
};
