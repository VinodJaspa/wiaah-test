import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { ServicesProviderDescriptionSection } from "./ServicesProviderDescriptionSection";

export default {
  title: "UI / Features /Services /Sections /ServiceProviderDescriptionSection",
  component: ServicesProviderDescriptionSection,
} as Meta<typeof ServicesProviderDescriptionSection>;

export const Default = {
  args: {
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has",
    bathrooms: 2,
    bedrooms: 2,
    bikes: 1,
    cars: 2,
    pets: 0,
  },
};
