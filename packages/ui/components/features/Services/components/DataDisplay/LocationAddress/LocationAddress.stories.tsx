import { ComponentMeta, ComponentStory } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { LocationAddressDisplay } from "./LocationAddress";

export default {
  title: storybookOtherServicesDataDisplayTitle + "LocationAddress",
  component: LocationAddressDisplay,
} as ComponentMeta<typeof LocationAddressDisplay>;

const template: ComponentStory<typeof LocationAddressDisplay> = (args) => (
  <LocationAddressDisplay {...args} />
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
