import { Meta, StoryFn } from "@storybook/react";
import { storybookOtherServicesSectionsTitle } from "utils";
import { PopularAmenitiesSection } from "./PopularAmenitiesSection";

export default {
  title: "UI / Features /Services /Sections /PopularAmenitiesSection",
  component: PopularAmenitiesSection,
} as Meta<typeof PopularAmenitiesSection>;

export const Default = {
  args: {
    amenities: [
      {
        name: "Kitchen",
        slug: "kitchen",
      },
      {
        name: "Televistion with Netflix",
        slug: "tv",
      },
      {
        name: "Washer",
        slug: "laundry",
      },
      {
        name: "Air conditioner",
        slug: "a/c",
      },
      {
        name: "Free Wifi",
        slug: "free_wifi",
      },
      {
        name: "Balcony or Patio",
        slug: "balcony",
      },
    ],
  },
};

export const moreCols = {
  args: {
    amenities: [
      {
        name: "Kitchen",
        slug: "kitchen",
      },
      {
        name: "Televistion with Netflix",
        slug: "tv",
      },
      {
        name: "Washer",
        slug: "laundry",
      },
      {
        name: "Air conditioner",
        slug: "a/c",
      },
      {
        name: "Free Wifi",
        slug: "free_wifi",
      },
      {
        name: "Balcony or Patio",
        slug: "balcony",
      },
    ],
    cols: 3,
  },
};
