import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { LocationAddress } from "./LocationAddress";

export default {
  title: storybookOtherServicesDataDisplayTitle + "LocationAddress",
  component: LocationAddress,
} as ComponentMeta<typeof LocationAddress>;

const template: ComponentStory<typeof LocationAddress> = (args) => (
  <LocationAddress {...args} />
);

export const Default = template.bind({});
Default.args = {
  address: "55 Rue de Penthièvre",
  city: "Paris",
  state: "lle-de-France",
  country: "France",
  countryCode: "FC",
  postalCode: 27910,
  cords: {
    lat: 15,
    lng: 15,
  },
};
