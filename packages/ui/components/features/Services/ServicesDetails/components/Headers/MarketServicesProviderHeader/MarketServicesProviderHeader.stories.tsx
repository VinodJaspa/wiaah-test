import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MarketServicesProviderHeader } from "./MarketServicesProviderHeader";
import { storybookOtherServicesHeadersTitle } from "utils";

export default {
  title: storybookOtherServicesHeadersTitle + "MarketServicesProviderHeader",
  component: MarketServicesProviderHeader,
} as ComponentMeta<typeof MarketServicesProviderHeader>;

const template: ComponentStory<typeof MarketServicesProviderHeader> = (
  args
) => <MarketServicesProviderHeader {...args} />;

export const Default = template.bind({});
Default.args = {
  name: "service name",
  rating: 4.6,
  reviewsCount: 162,
  thumbnail: "/shop-2.jpeg",
  travelPeriod: {
    arrival: new Date().toString(),
    departure: new Date().toString(),
  },
};
