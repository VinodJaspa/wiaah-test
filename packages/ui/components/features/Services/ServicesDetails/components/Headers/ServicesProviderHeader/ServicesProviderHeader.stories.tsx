import { randomNum, storybookOtherServicesHeadersTitle } from "utils";
import { ServicesProviderHeader } from "./ServicesProviderHeader";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "UI / Features /Services /Headers /ServiceProviderHeader",
  component: ServicesProviderHeader,
} as Meta<typeof ServicesProviderHeader>;

export const Default = {
  args: {
    name: "Ibis Paris Main Montparnase 14th",
    rating: randomNum(5),
    reviewsCount: randomNum(200),
    thumbnail: "/place-2.jpg",
  },
};

export const WithTravelPeriod = {
  args: {
    name: "Ibis Paris Main Montparnase 14th",
    rating: randomNum(5),
    reviewsCount: randomNum(200),
    thumbnail: "/place-2.jpg",
    travelPeriod: {
      arrival: new Date().toString(),
      departure: new Date().toString(),
    },
  },
};
