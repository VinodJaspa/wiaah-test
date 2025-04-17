import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServiceReachOutSection } from "./ServiceReachOutSection";

export default {
  title: "UI / Features /Services /Sections /ServiceReachOutSection",
  component: ServiceReachOutSection,
} as Meta<typeof ServiceReachOutSection>;

export const Default = {
  args: {
    email: "Example@email.com",
    location: {
      address: "Rue du marche 34",
      city: "Geneve",
      country: "switzerland",
      cords: {
        lat: 45.464664,
        lng: 9.18854,
      },
      countryCode: "USA",
      state: "state",
      postalCode: 1204,
    },
    telephone: "101227879123",
  },
};
