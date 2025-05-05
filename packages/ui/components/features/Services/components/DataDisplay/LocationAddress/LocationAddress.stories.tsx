import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesDataDisplayTitle } from "utils";
import { LocationAddress } from "./LocationAddress";

export default {
  title: "UI / Features /Services /Data Display /LocationAddress",
  component: LocationAddress,
} as Meta<typeof LocationAddress>;

export const Default = {
  args: {
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
  },
};
