import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServiceOnMapLocalizationSection } from "./ServiceLocalizationSection";

export default {
  title: "UI / Features /Services /Sections /ServiceOnMapLocalizationSection",
  component: ServiceOnMapLocalizationSection,
} as Meta<typeof ServiceOnMapLocalizationSection>;

export const Default = {
  args: {
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
  },

  decorators: [
    (Story, args) => (
      <div className="w-[50vw]">
        <Story />
      </div>
    ),
  ],
};
