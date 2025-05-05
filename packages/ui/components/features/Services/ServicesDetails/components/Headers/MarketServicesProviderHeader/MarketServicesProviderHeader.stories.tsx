import { Meta, StoryFn } from "@storybook/react";
import { MarketServicesProviderHeader } from "./MarketServicesProviderHeader";
import { storybookOtherServicesHeadersTitle } from "utils";

export default {
  title: "UI / Features /Services /Headers /MarketServicesProviderHeader",
  component: MarketServicesProviderHeader,
} as Meta<typeof MarketServicesProviderHeader>;

export const Default = {
  args: {
    name: "service name",
    rating: 4.6,
    reviewsCount: 162,
    thumbnail: "/shop-2.jpeg",
    travelPeriod: {
      arrival: new Date().toString(),
      departure: new Date().toString(),
    },
  },
};
